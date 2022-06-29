import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import GenericError from '../GenericErrorModal';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false)

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors){ setErrors(data.errors)
                                      setShowModal(true)};
        });
    }
    else{ setErrors(['Confirm Password field must be the same as the Password field']);
    setShowModal(true)};
  return ;
  };

  return (
    <div className="login-main">
       <GenericError setShowModal={setShowModal} showModal={showModal} errors={errors} />
      <div className='login-form-box'>
        <img id='login-dots' alt='flickr dots' src='./images/flickrdots.png'/>
        <div id='login-mssg'>Sign up for Flippr</div>
    <form className="signup-login" onSubmit={handleSubmit}>
      <label htmlFor="email" >
        Email
        </label>
        <input
          type="text"
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

      <label htmlFor="username">
        Username
        </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

      <label htmlFor="password">
        Password
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

      <label htmlFor="confirmpassword">
        Confirm Password
        </label>
        <input
          type="password"
          name="confirmpassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button className='bttn' type="submit">Sign Up</button>
      </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
