import React from "react";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import User from "../User";
import "./NavBar.css";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className="navbar">
      {sessionUser && (
        <div className="navbar logged-in">
          <NavLink to="/" exact={true} activeClassName="yap">
            yap 
          </NavLink>
          <div className='user-div'>
            <User />
            <LogoutButton />
          </div>
        </div>
      )}
      {!sessionUser && (
        <div className="navbar logged-out">
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
