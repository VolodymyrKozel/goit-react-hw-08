import css from './Contact.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { deleteContact } from '../../../redux/contacts/operations';
import { useState } from 'react';
import ModalDelete from '../../ModalDelete/ModalDelete';
import { BsFillPencilFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
export default function Contact({ contact }) {
  const error = useSelector(state => state.contacts.error);
  const dispatch = useDispatch();
  const { id, name, number } = contact;

  const [modalIsOpen, setIsOpen] = useState(false);
  function handleYes() {
    setIsOpen(false);
    dispatch(deleteContact(id));
    error
      ? toast.error('samething went wrong')
      : toast.success(`Contact ${name} deleted `);
  }

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

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
      <div className={css.btnWrapper}>
        <NavLink
          to={`/contacts/editContact/${id}`}
          className={css['btn-contact']}
          aria-label="Edit"
          title="Edit">
          <BsFillPencilFill />
        </NavLink>

        <button
          onClick={openModal}
          id={id}
          className={css['btn-contact']}
          aria-label="Delete"
          title="Delete">
          <FaTrashAlt />
        </button>
      </div>

      <ModalDelete
        name={name}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        handleYes={handleYes}
      />
    </>
  );
}
