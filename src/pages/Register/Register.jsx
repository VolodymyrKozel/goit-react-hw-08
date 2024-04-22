import DocumentTitle from '../../components/DocumentTitle';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';

export default function Register() {
  return (
    <div className="container">
      <DocumentTitle>Registration</DocumentTitle>
      <RegisterForm />
    </div>
  );
}
