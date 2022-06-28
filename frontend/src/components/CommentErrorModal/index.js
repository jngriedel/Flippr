import React from 'react';
import { Modal } from '../../context/Modal';
import CommentErrorModal from './CommentErrorModal.js';

function CommentError({showModal, setShowModal}) {

// console.log('This is inside the index model', showModal)

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CommentErrorModal setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default CommentError
