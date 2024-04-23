import Contact from './contact/Contact';
import { useSelector } from 'react-redux';
import {
  selectContacts,
  selectNameFilter,
  selectFilteredContacts,
} from '../../redux/contacts/selectors';
import css from './ContactList.module.css';
import { useEffect, useRef } from 'react';
export default function ContactList() {
  const containerDiv = useRef(null);
  useEffect(() => {
    containerDiv.current.classList.add(css['fade-in-bottom']);
  });
  const contacts = useSelector(selectContacts);
  const query = useSelector(selectNameFilter);
  const contactsData = useSelector(selectFilteredContacts);
  return (
    <ul ref={containerDiv} className={css['contact-list']}>
      {contacts && contacts.length === 0 && (
        <li className={css['contact-item']}>You have no contacts yet</li>
      )}
      {query && contactsData.length === 0 && (
        <li className={css['contact-item']}>No contacts found</li>
      )}
      {contactsData ? (
        contactsData.map(contact => (
          <li className={css['contact-item']} key={contact.id}>
            <Contact contact={contact} />
          </li>
        ))
      ) : (
        <li className={css['contact-item']}>
          <p>No contacts yet</p>
        </li>
      )}
    </ul>
  );
}
