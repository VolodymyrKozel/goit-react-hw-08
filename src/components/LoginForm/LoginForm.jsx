import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader';
import { logIn } from '../../redux/auth/operations';
import { nanoid } from 'nanoid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { selectIsLoading } from '../../redux/contacts/selectors';
import * as Yup from 'yup';
import css from './LoginForm.module.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required'),
});

const initialValues = {
  email: '',
  password: '',
};

export const LoginForm = () => {
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const emailFieldId = nanoid();
  const passwordFieldId = nanoid();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        toast.success('You are successfully logged in');
      })
      .catch(() => {
        toast.error('Wrong email or password');
      });
    actions.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={LoginSchema}>
        <Form className={css.form}>
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
          <label className={css.label} htmlFor={passwordFieldId}>
            Password
          </label>
          <Field
            className={css.input}
            type="password"
            name="password"
            id={passwordFieldId}
          />
          <ErrorMessage
            className={css.error}
            name="password"
            component="span"
          />
          <button className={css.btn} type="submit">
            LogIn
          </button>
        </Form>
      </Formik>
      {isLoading && <Loader />}
    </>
  );
};
