import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormikPersist from '../FormikPersist';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';

import css from './RegisterForm.module.css';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email().required('Required'),
  emailConfirmation: Yup.string().oneOf(
    [Yup.ref('email'), null],
    'Emails must match'
  ),
  password: Yup.string()
    .matches(passwordRules, { message: 'Please create a stronger password' })
    .required('Required'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

const initialValues = {
  name: '',
  email: '',
  emailConfirmation: '',
  password: '',
  passwordConfirmation: '',
};

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const nameFieldId = nanoid();
  const emailFieldId = nanoid();
  const emailConfirmationFieldId = nanoid();
  const passwordFieldId = nanoid();
  const passwordConfirmationFieldId = nanoid();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={RegisterSchema}>
      <Form className={css.form}>
        <label className={css.label} htmlFor={nameFieldId}>
          Name
        </label>
        <Field className={css.input} type="text" name="name" id={nameFieldId} />
        <ErrorMessage className={css.error} name="name" component="span" />

        <label className={css.label} htmlFor={emailFieldId}>
          Email
        </label>
        <Field
          className={css.input}
          type="text"
          name="email"
          id={emailFieldId}
        />
        <ErrorMessage className={css.error} name="email" component="span" />

        <label className={css.label} htmlFor={emailConfirmationFieldId}>
          Email Confirmation
        </label>
        <Field
          className={css.input}
          type="text"
          name="emailConfirmation"
          id={emailConfirmationFieldId}
        />
        <ErrorMessage
          className={css.error}
          name="emailConfirmation"
          component="span"
        />

        <label className={css.label} htmlFor={passwordFieldId}>
          Password
        </label>
        <Field
          className={css.input}
          type="password"
          name="password"
          id={passwordFieldId}
          title="Password must contain at least 5 characters, 1 uppercase letter, 1 lowercase letter and 1 numeric digit"
        />
        <ErrorMessage className={css.error} name="password" component="span" />

        <label className={css.label} htmlFor={passwordConfirmationFieldId}>
          Password Confirmation
        </label>
        <Field
          className={css.input}
          type="password"
          name="passwordConfirmation"
          id={passwordConfirmationFieldId}
        />
        <ErrorMessage
          className={css.error}
          name="passwordConfirmation"
          component="span"
        />

        <button className={css.btn} type="submit">
          Register
        </button>
        <FormikPersist
          name="signup"
          ignoreValues={['password', 'passwordConfirmation']}
        />
      </Form>
    </Formik>
  );
};
