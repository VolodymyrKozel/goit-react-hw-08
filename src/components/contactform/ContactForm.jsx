import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';
import css from './ContactForm.module.css';

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .matches(
      /^[+\0-9]{3,15}$/,
      'Phone number is not valid, must be only digits'
    )
    .required('Required'),
});

const initialValues = {
  name: '',
  number: '',
};

export default function ContactForm() {
  const dispatch = useDispatch();
  const nameFieldId = nanoid();
  const numberFieldId = nanoid();

  const handleSubmit = (values, actions) => {
    values.id = nanoid();
    dispatch(addContact(values));
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}>
      <Form className={css.form}>
        <label className={css.label} htmlFor={nameFieldId}>
          Name
        </label>
        <Field className={css.input} type="text" name="name" id={nameFieldId} />
        <ErrorMessage className={css.error} name="name" component="span" />

        <label className={css.label} htmlFor={numberFieldId}>
          Number
        </label>
        <Field
          className={css.input}
          type="text"
          name="number"
          id={numberFieldId}
        />
        <ErrorMessage className={css.error} name="number" component="span" />

        <button className={css.btn} type="submit">
          Save contact
        </button>
      </Form>
    </Formik>
  );
}
