import React, { useState, useEffect } from 'react';
// import * as imagesActions from '../../store/images';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import {getImages, removeImage} from '../../store/images';
import './CameraRoll.css';

function CameraRoll() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()

  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(()=> {
    dispatch(getImages(sessionUser.id))
  },[])

 
  const redirect = (imageId) => {
    history.push(`/images/${imageId}`)
  }
  const userImagesObj = useSelector(state => state.images)
  const userImages = Object.values(userImagesObj)






  return (
    <div className='cameraroll-main'>
        <div className='banner-cameraroll'></div>
        <div className='all-cameraroll-images'>

            {
            userImages &&
            userImages.map((image)=> (

                <div key={image.id} className='image-cameraroll-container'>
                    <img onClick={()=>redirect(image.id)} className='image-cameraroll' src={image.imageUrl}/>
                </div>
            ))
            }
        </div>



    </div>
  );

}

export default CameraRoll
