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

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    history.push('/login')
  };

  return (
    <>
      <button className="dropdown-bttn" onClick={openMenu}>
      </button>
      <div className="dropdown-menu">
      {showMenu && (
        <>
        <div className="greeting-box">
          <div className="intro-message">
          <h4>{'Hello, '}</h4><NavLink id='profile-link' to="/cameraroll"> {user.username}</NavLink>
          <h4>!</h4>

          </div>
          <p id='silly-greeting'>Now you know how to greet people in English.</p>
        </div>

          <div className="other-menu-options">
          <NavLink className="dropdown-options" to="/cameraroll">Your Photos</NavLink>

          <button id="dropdown-logout" onClick={logout}>Log Out</button>
          </div>

        </>
      )}
      </div>
    </>
  );
}

export default ProfileButton;
