import { NavLink } from 'react-router-dom';
import ContactList from '../../components/contactlist/ContactList';
import SearchBox from '../../components/searchbox/SearchBox';
import DocumentTitle from '../../components/DocumentTitle';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from '../../redux/contacts/operations';
import { FaPlus } from 'react-icons/fa';

export default function ContactsPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div className="container">
      <DocumentTitle>Contacts</DocumentTitle>
      <NavLink
        aria-label="add contact"
        className={(({ isActive }) => (isActive ? 'active' : null), 'btn-add')}
        title="Add new contact"
        to="/contacts/addContact">
        <FaPlus />
      </NavLink>
      <Outlet />
      <SearchBox />
      <ContactList />
    </div>
  );
}
