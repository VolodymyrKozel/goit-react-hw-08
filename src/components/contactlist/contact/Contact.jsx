import css from './Contact.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../../redux/contactsOps';
import { useState } from 'react';
export default function Contact({ contact }) {
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();
  function handleClick(e) {
    setIsDelete(!isDelete);
    const id = e.target.id;
    dispatch(deleteContact(id));
  }
  const { id, name, number } = contact;
  return (
    <>
      <ul className={css['contact-list']}>
        <li className={css['contact-item']}>
          <svg className={css['svg-icon']} width="24" height="24">
            <use href="img/icons.svg#icon-user" />
          </svg>
          <p>{name}</p>
        </li>
        <li className={css['contact-item']}>
          <svg className={css['svg-icon']} width="24" height="24">
            <use href="img/icons.svg#icon-phone" />
          </svg>
          <a href={`tel:${number}`}>{number}</a>
        </li>
      </ul>
      <button
        onClick={handleClick}
        id={id}
        disabled={isDelete}
        className={css['btn-contact']}>
        Delete
        <svg className={css['svg-icon']} width="24" height="24">
          <use href="img/icons.svg#icon-bin" />
        </svg>
      </button>
    </>
  );
}
