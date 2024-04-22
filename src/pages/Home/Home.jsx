import { Link } from 'react-router-dom';
import DocumentTitle from '../../components/DocumentTitle';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { selectUser } from '../../redux/auth/selectors';
export default function Home() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  return (
    <div className="container">
      <DocumentTitle>Home</DocumentTitle>
      {isLoggedIn ? (
        <>
          <p className="text">
            Welcome to your phonebook {user.name.toUpperCase()}
          </p>
        </>
      ) : (
        <>
          <p className="text">
            Welcome to your phonebook. Here you can add new contacts. Search for
            them by name or number. Delete or edit them.
          </p>
          <p className="text">
            If you new user, please{' '}
            <Link className="link" to="/register">
              sing up
            </Link>
          </p>
          <p className="text">
            If you already have an account, please{' '}
            <Link className="link" to="/login">
              log in
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
