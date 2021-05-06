import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ChannelForm from "./ChannelFormModal.js";

function ChannelFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create Server</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ChannelForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default ChannelFormModal;
