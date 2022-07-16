import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from 'react-router-dom';


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);

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
    history.push('/login')
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className="dropdown-bttn" onClick={openMenu}>
      </button>
      {showMenu && (

      <div className="dropdown-menu" id="dropdown-main">
        <div className="greeting-box">
          <div className="intro-message">
          <h4>{'Hello,'}</h4><div>&nbsp;</div><NavLink id='profile-link' to="/cameraroll"> {user.username}</NavLink>
          <h4>!</h4>

          </div>
          <p id='silly-greeting'>Now you know how to greet people in English.</p>
        </div>

          <div className="other-menu-options">
          <NavLink className="dropdown-options" to="/cameraroll">Your Photos</NavLink>
          <NavLink className="dropdown-options" to={`/${sessionUser.id}/favorites`}>Your Favorites</NavLink>

          <button id="dropdown-logout" onClick={logout}>Log Out</button>
          </div>

      </div>

      )}
    </>
  );
}

export default ProfileButton;
