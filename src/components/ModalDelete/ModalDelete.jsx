import Modal from 'react-modal';
import { IoIosClose } from 'react-icons/io';
import css from './ModalDelete.module.css';

Modal.setAppElement('#root');

function ModalDelete({ modalIsOpen, closeModal, handleYes, name }) {
  return (
    <Modal
      closeTimeoutMS={400}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={{
        base: css.modalDelete,
        afterOpen: css.afterOpen,
        beforeClose: css.beforeClose,
      }}
      overlayClassName={css.overlay}
      contentLabel="delete contact">
      <h2 className={css.title}>
        Are you sure you want to delete{' '}
        <span className={css.accent}>{name}</span>
      </h2>
      <button className={css['btn-close']} onClick={closeModal}>
        <IoIosClose className={css.icon} />
      </button>
      <div className={css['btn-wrapper']}>
        <button className="btn" onClick={handleYes}>
          Yes
        </button>
        <button className="btn" onClick={closeModal}>
          No
        </button>
      </div>
    </Modal>
  );
}

export default ModalDelete;
