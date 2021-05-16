import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ServerForm from "./ServerFormModal.js";
import './ServerFormModal.css';

function ServerFormModal() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button id='create-server' onClick={() => setShowModal(true)}>Create Server</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<ServerForm setShowModal={setShowModal} />
				</Modal>
			)}
		</>
	);
}

export default ServerFormModal;
