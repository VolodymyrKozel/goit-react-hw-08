import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './App.module.css';
import ContactForm from './components/contactform/ContactForm';
import ContactList from './components/contactlist/ContactList';
import SearchBox from './components/searchbox/SearchBox';
import { fetchContacts } from './redux/contactsOps';
import { selectError, selectIsLoading } from './redux/selectors';
function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css['container']}>
      <h1 className={css['app-title']}>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {isLoading && !error && <p>Loading contacts...</p>}
      <ContactList />
    </div>
  );
}

export default App;
