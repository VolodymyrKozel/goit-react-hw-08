import css from './AddContact.module.css';
import ContactForm from '../contactform/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { IoIosClose } from 'react-icons/io';
import { useEffect, useRef } from 'react';

function AddContact() {
  const dispatch = useDispatch();
  const error = useSelector(state => state.contacts.error);
  const navigate = useNavigate();
  const containerDiv = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleSubmit(values, actions) {
    dispatch(addContact(values));
    error
      ? toast.error('samething went wrong')
      : toast.success(`Contact ${values.name} added successfully`);
    actions.resetForm();
    daleyRedirect();
  }
  function daleyRedirect() {
    containerDiv.current.classList.remove(css['slide-in-elliptic-top-fwd']);
    containerDiv.current.classList.add(css['slide-out-elliptic-top-bck']);
    const timeout = setTimeout(() => {
      navigate('/contacts');
    }, 700);

    return () => {
      clearTimeout(timeout);
    };
  }
  return (
    <div
      ref={containerDiv}
      className={`${css.container} ${css.add} ${css['slide-in-elliptic-top-fwd']}`}>
      <h1 className={css.title}>Add contact</h1>
      <ContactForm handleSubmit={handleSubmit} />
      <button
        onClick={daleyRedirect}
        className={css.close}
        aria-label="close"
        title="close">
        <IoIosClose className={css.icon} />
      </button>
    </div>
  );
}

export default AddContact;
