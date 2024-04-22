import { useEffect, useRef } from 'react';
import { useFormikContext } from 'formik';
import isEqual from 'react-fast-compare';
import { useDebouncedCallback } from 'use-debounce';

const FormikPersist = ({ name, ignoreValues }) => {
  const { values, setValues } = useFormikContext();

  const prefValuesRef = useRef();

  function omitValues(values, ignoreValues) {
    const clone = { ...values };
    ignoreValues.forEach(element => {
      clone[element] = '';
    });
    return clone;
  }

  const onSave = values => {
    const filteredValues = ignoreValues
      ? omitValues(values, ignoreValues)
      : values;

    window.localStorage.setItem(name, JSON.stringify(filteredValues));

    /*     window.localStorage.setItem(name, JSON.stringify(values)); */
  };
  const debouncedOnSave = useDebouncedCallback(onSave, 300);

  useEffect(() => {
    const savedForm = window.localStorage.getItem(name);

    if (savedForm) {
      const parsedForm = JSON.parse(savedForm);

      prefValuesRef.current = parsedForm;
      setValues(parsedForm);
    }
  }, [name, setValues]);

  useEffect(() => {
    if (!isEqual(prefValuesRef.current, values)) {
      debouncedOnSave(values);
    }
  });

  useEffect(() => {
    prefValuesRef.current = values;
  });

  return null;
};

export default FormikPersist;
