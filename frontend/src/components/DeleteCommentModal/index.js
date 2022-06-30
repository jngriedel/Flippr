import React from 'react';
import { Modal } from '../../context/Modal';
import DeleteCommentModal from './DeleteCommentModal.js';

function DeleteComment({showModal, setShowModal}) {



  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteCommentModal setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default DeleteComment
