import React, { useState, useEffect } from 'react';
// import * as imagesActions from '../../store/images';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {getImages, removeImage} from '../../store/images';
import './CameraRoll.css';

function CameraRoll() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(()=> {
    dispatch(getImages(sessionUser.id))
  },[])

  const deleteImage = (imageId) => {
    dispatch(removeImage(imageId))
  }

  const userImagesObj = useSelector(state => state.images)
  const userImages = Object.values(userImagesObj)

 




  return (
    <div className='all-cameraroll-images'>

        {
        userImages &&
        userImages.map((image)=> (

            <div key={image.id} className='image-cameraroll-container'>
            <img className='image-cameraroll' src={image.imageUrl}/>
            <span>{image.content}</span>
            <button onClick={()=>deleteImage(image.id)}>Delete</button>
            </div>
        ))
        }
    </div>
  );

}

export default CameraRoll
