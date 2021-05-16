import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postServer } from "../../store/servers";
import './ServerFormModal.css'

function ServerForm({ setShowModal }) {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);
	const [serverName, setServerName] = useState("");
	const [isPublic, setIsPublic] = useState(true);

	const submit = async (e) => {
		e.preventDefault();
		const data = await dispatch(postServer(serverName, isPublic));
		if (data.errors) {
			setErrors(data.errors);
		}
        setShowModal(false)
	};

	return (
		<>
			<form id='server-form' onSubmit={submit}>
				<div>
					{errors.map((error) => (
						<div>{error}</div>
					))}
				</div>
					<label htmlFor="serverName">Server Name</label>
					<input
                        id='server-form-input'
						name="serverName"
						type="text"
						value={serverName}
						onChange={(e) => setServerName(e.target.value)}
					/>
                <div>
					<label htmlFor="public">Public</label>
					<input
						name="public"
						type="checkbox"
						value={isPublic}
						onChange={(e) => setIsPublic(e.target.value)}
					/>
                </div>
				<button id='server-submit' type="submit">Submit</button>
			</form>
		</>
	);
}

export default ServerForm;
