import React from 'react';
import { Modal } from '../../context/Modal';
import GenericErrorModal from './GenericErrorModal'

function GenericError({showModal, setShowModal, errors}) {



  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <GenericErrorModal setShowModal={setShowModal} errors={errors} />
        </Modal>
      )}
    </>
  );
}

export default GenericError
