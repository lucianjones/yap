import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import LogoutButton from "../auth/LogoutButton";
import User from "../User";
import { login } from "../../store/session";
import "./NavBar.css";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  function demoOne(e) {
      e.preventDefault();
      dispatch(login('demo@aa.io', 'password'))
  }
  function demoTwo(e) {
      e.preventDefault();
      dispatch(login('demo2@aa.io', 'password'))
  }

  return (
    <nav className="navbar">
      {sessionUser && (
        <div className="navbar logged-in">
          <NavLink to="/" exact={true} className="yap">
            yap 
          </NavLink>
          <div className='user-div'>
            <User />
            <LogoutButton />
          </div>
        </div>
      )}
      {!sessionUser && (
          <>
        <NavLink to="/" exact={true} className="yap">
            yap 
          </NavLink>
        <div className="navbar logged-out">
          <LoginFormModal />
          <SignupFormModal />
          <button className='demo' onClick={demoOne}>Demo User 1</button>
          <button className='demo' onClick={demoTwo}>Demo User 2</button>
        </div>
          </>
      )}
    </nav>
  );
};

export default NavBar;
