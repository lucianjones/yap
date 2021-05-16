import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ChannelForm from "./ChannelFormModal.js";
import './ChannelFormModal.css';

function ChannelFormModal({ server_id }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id='create-channel' onClick={() => setShowModal(true)}>Create Channel</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ChannelForm server_id={server_id} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default ChannelFormModal;
