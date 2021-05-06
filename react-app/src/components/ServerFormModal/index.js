import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ServerForm from "./ServerFormModal.js";

function ServerFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create Server</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ServerForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default ServerFormModal;
