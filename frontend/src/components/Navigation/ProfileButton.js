import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from 'react-router-dom';


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
      <button className="dropdown-bttn" onClick={openMenu}>
        <i className="fa-solid fa-camera" />
      </button>
      <div className="dropdown-menu">
      {showMenu && (
        <>
          <div className="intro-message">
          <h4>{'Hello, '}</h4><NavLink id='profile-link' to="/cameraroll"> {user.username}</NavLink>
          <h4>!</h4>
          <p id='silly-greeting'>Now you know how to greet people in English</p>
          </div>

          <NavLink to="/cameraroll">Your Photos</NavLink>

          <button className="dropdown-options" onClick={logout}>Log Out</button>


        </>
      )}
      </div>
    </>
  );
}

export default ProfileButton;
