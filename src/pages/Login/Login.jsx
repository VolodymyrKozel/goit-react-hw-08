import DocumentTitle from '../../components/DocumentTitle';
import { LoginForm } from '../../components/LoginForm/LoginForm';

export default function Login() {
  return (
    <div className="container">
      <DocumentTitle>Login</DocumentTitle>
      <LoginForm />
    </div>
  );
}
