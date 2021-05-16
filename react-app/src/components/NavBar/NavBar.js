import React from "react";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import LogoutButton from "../auth/LogoutButton";
import User from "../User";
import "./NavBar.css";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

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
        </div>
          </>
      )}
    </nav>
  );
};

export default NavBar;
