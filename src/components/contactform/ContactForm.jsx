import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
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

export default function ContactForm({ handleSubmit, initialValues }) {
  const nameFieldId = nanoid();
  const numberFieldId = nanoid();
  if (!initialValues) {
    initialValues = {
      name: '',
      number: '',
    };
  }
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}>
        <Form className={`${css.form} ${css['fade-in-fwd']}`}>
          <label className={css.label} htmlFor={nameFieldId}>
            Name
          </label>
          <Field
            className={css.input}
            type="text"
            name="name"
            id={nameFieldId}
          />
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
            {initialValues.name ? 'Edit contact' : 'Save contact'}
          </button>
        </Form>
      </Formik>
    </>
  );
}
