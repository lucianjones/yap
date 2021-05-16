import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

const SignupForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form id='signup-form' onSubmit={onSignUp}>
        <label>User Name</label>
        <input
          className='signup-form-input'
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
        <label>Email</label>
        <input
          className='signup-form-input'
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
        <label>Password</label>
        <input
          className='signup-form-input'
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
        <label>Repeat Password</label>
        <input
          className='signup-form-input'
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
        <button id='signup-submit' type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
