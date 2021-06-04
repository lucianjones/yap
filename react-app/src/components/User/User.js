import React from 'react';
import { useSelector } from 'react-redux';
import './User.css';

function User() {
  const user = useSelector((store) => store.session.user);

  if (!user) {
    return null;
  }

  return (
    <div className='user-box'>
        <div className='user' style={{'text-align': 'right'}}>{user.username}</div>
        <div className='user' style={{'text-align': 'right'}}>{user.email}</div>
    </div>
  );
}
export default User;
