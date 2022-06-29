import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';
import GenericError from '../GenericErrorModal';



function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false)

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const demoUser = () => {
    dispatch(sessionActions.login( {credential: 'demo@user.io', password: 'password'} ))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors){ setErrors(data.errors)
                                 setShowModal(true)   };
      });
  }

  return (
    <div className='login-main' >
      <GenericError setShowModal={setShowModal} showModal={showModal} errors={errors} />
      <div className='login-form-box'>
        <img id='login-dots' alt='flickr dots' src='./images/flickrdots.png'/>
        <div id='login-mssg'>Log in to Flippr</div>
    <form className='signup-login' onSubmit={handleSubmit}>
      <label htmlFor='user'>
        Username or Email
        </label>
        <input
          type="text"
          name='user'
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required

        />

      <label htmlFor='password'>
        Password
        </label>
        <input
          name='password'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required

        />

      <button className='bttn' type="submit">Log In</button>
    </form>
    <button className='bttn demouser-bttn' onClick={demoUser}>Demo User</button>
    </div>
    </div>
  );
}

export default LoginFormPage;
