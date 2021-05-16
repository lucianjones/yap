import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SingupForm from "./SignupForm.js";
import './SignupForm.css';

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id='signup' onClick={() => setShowModal(true)}>
        Sign-Up
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SingupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
