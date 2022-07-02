import React, { useState } from 'react';
// import * as imagesActions from '../../store/images';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import {uploadImage} from '../../store/images';
import './ImageFormPage.css';
import GenericError from '../GenericErrorModal';

function ImageFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [image, setImage] = useState(null);
  const history = useHistory()

  if (!sessionUser) { return (
    <Redirect to='/login'/>
  )
  }


  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors([]);
    const payload = {
        image,
        content,
        userId : sessionUser.id
    }
    dispatch(uploadImage(payload))
      .then(()=>{
        history.push('/cameraroll')
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors){ setErrors(data.errors)
            setShowModal(true)   };
      });

  }

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };








  return (
    <div className='imagesubmit-main'>
        <GenericError setShowModal={setShowModal} showModal={showModal} errors={errors} />
        <div className='login-form-box'>
    <form className='signup-login' onSubmit={handleSubmit}>
      <label htmlFor='uploadImg'>
        Upload Your Image
        </label>
        <input
          type="file"
          name='uploadImg'

          onChange={updateFile}
          required
        />

      <label htmlFor='content'>
        Short Description (Optional)
        </label>
        <input
          type="text"
          name='content'
          value={content}
          onChange={(e) => setContent(e.target.value)}

        />

      <button className='bttn' type="submit">Upload</button>
    </form>
    </div>
    </div>
  );
}

export default ImageFormPage;
