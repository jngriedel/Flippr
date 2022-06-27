import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <NavLink to='/images/upload'>
      <i className="fa fa-cloud-upload" id="cloud-bttn" aria-hidden="true"></i>
      </NavLink>
      <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink id="login-bttn" to="/login">Log In</NavLink>
        <NavLink id="signup-bttn" to="/signup">Sign Up</NavLink>
        {/* <NavLink to='/images/upload'><i class="fa fa-cloud-upload" aria-hidden="true"></i></NavLink> */}
      </>
    );
  }

  return (
    <div className='navbar'>
      <div className='logo-dots'>
          <img id='dots' src='/images/flickrdots.png'></img>
          <img id='logo' src='/images/flipprlogo.png'></img>
      </div>
    <ul id='rightsidenav'>
      <li>
        <NavLink exact to="/"><i id='house-bttn' className="fa-solid fa-house"></i></NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
    </div>
  );
}

export default Navigation;
