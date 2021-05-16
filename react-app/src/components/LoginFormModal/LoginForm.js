import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import './LoginForm.css'

const LoginForm = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data.errors) {
			setErrors(data.errors);
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<form id='login-form' onSubmit={onLogin}>
			<div>
				{errors.map((error) => (
					<div>{error}</div>
				))}
			</div>
				<label htmlFor="email">Email</label>
				<input
                    className='login-form-input'
					name="email"
					type="text"
					placeholder="Email"
					value={email}
					onChange={updateEmail}
				/>
				<label htmlFor="password">Password</label>
				<input
                    className='login-form-input'
					name="password"
					type="password"
					placeholder="Password"
					value={password}
					onChange={updatePassword}
				/>
				<button id='login-submit' type="submit">Login</button>
		</form>
	);
};

export default LoginForm;
