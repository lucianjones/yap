import React from 'react';
import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import User from './User';
import ServerFormModal from './ServerFormModal'


const NavBar = () => {
    const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav>
    { sessionUser && (
        <div>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
          <ServerFormModal />
          <User />
          <LogoutButton />
        </div>
    )}
    { !sessionUser && (
        <div>
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
}

export default NavBar;
