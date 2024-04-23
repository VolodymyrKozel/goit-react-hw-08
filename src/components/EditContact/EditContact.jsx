import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectContactById } from '../../redux/contacts/selectors';
import { editContact } from '../../redux/contacts/operations';
import toast from 'react-hot-toast';
import ContactForm from '../contactform/ContactForm';
import css from './EditContact.module.css';
import { IoIosClose } from 'react-icons/io';
import { useEffect, useRef } from 'react';
import { selectError } from '../../redux/contacts/selectors';
function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const currentContact = useSelector(selectContactById(id));
  const initialValues = {
    name: currentContact.name,
    number: currentContact.number,
  };

  const containerDiv = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    containerDiv.current.classList.add(css['slide-in-elliptic-top-fwd']);
    const timeout = setTimeout(() => {
      containerDiv.current.classList.remove(css['slide-in-elliptic-top-fwd']);
    }, 700);
    return () => {
      clearTimeout(timeout);
    };
  }, [id]);
  function handleSubmit(values, actions) {
    dispatch(editContact({ ...values, id }));
    error
      ? toast.error('samething went wrong')
      : toast.success(`Contact ${values.name} edited successfully`);
    daleyRedirect();
    actions.resetForm();
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
      className={`${css.container} ${css['slide-in-elliptic-top-fwd']}`}>
      <h1 className={css.title}>Edit contact {currentContact.name}</h1>
      <ContactForm initialValues={initialValues} handleSubmit={handleSubmit} />
      <button
        className={css.close}
        onClick={daleyRedirect}
        type="button"
        title="Close"
        aria-label="Close button">
        <IoIosClose className={css.icon} />
      </button>
    </div>
  );
}

export default EditContact;
