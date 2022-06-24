import React, { useState } from 'react';
// import * as imagesActions from '../../store/images';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {getImages} from '../../store/images';
// import './ImageForm.css';

function CameraRoll() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  if (!sessionUser) { return (
    <Redirect to='/login'/>
  )
  }

  useEffect(()=> {
    dispatch(getImages(sessionUser.id))
  },[])




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

export default CameraRoll
