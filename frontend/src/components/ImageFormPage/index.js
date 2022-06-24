import React, { useState } from 'react';
// import * as imagesActions from '../../store/images';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import './ImageForm.css';

function ImageFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  if (!sessionUser) { return (
    <Redirect to='/login'/>
  )
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const payload = {
        imageUrl,
        content,
        userId : sessionUser.id
    }
    // return dispatch(sessionActions.login({ credential, password }))
    //   .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    //   });
  }

  return (
    <div >
    <form className='' onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, i) => <li key={i}>{error}</li>)}
      </ul>
      <label>
        Image URL
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </label>
      <label>
        Describe Your Image
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </label>
      <button className='login-bttn' type="submit">Upload</button>
    </form>
    </div>
  );
}

export default ImageFormPage;
