import React, { useState } from 'react';
// import * as imagesActions from '../../store/images';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import {uploadImage} from '../../store/images';
import './ImageFormPage.css';

function ImageFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);
  const history = useHistory()

  if (!sessionUser) { return (
    <Redirect to='/login'/>
  )
  }


  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors([]);
    const payload = {
        imageUrl,
        content,
        userId : sessionUser.id
    }
    const response = await dispatch(uploadImage(payload))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
      if (response){
     history.push('/cameraroll')
      }
  }

  return (
    <div >
    <form className='submit-image-form' onSubmit={handleSubmit}>
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

        />
      </label>
      <button className='bttn' type="submit">Upload</button>
    </form>
    </div>
  );
}

export default ImageFormPage;
