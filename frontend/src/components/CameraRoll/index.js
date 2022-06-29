import React, {  useEffect } from 'react';
// import * as imagesActions from '../../store/images';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {getImages, } from '../../store/images';
import './CameraRoll.css';

function CameraRoll() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()



  useEffect(()=> {
    dispatch(getImages(sessionUser.id))
  },[dispatch, sessionUser.id])


  const redirect = (imageId) => {
    history.push(`/images/${imageId}`)
  }
  const userImagesObj = useSelector(state => state.images)
  const userImages = Object.values(userImagesObj)






  return (
    <div className='cameraroll-main'>
        <div className='banner-cameraroll'>
            <h1 id='cameraroll-username'>{sessionUser.username}</h1>

        </div>
        <div className='cameraroll-label'>
            Camera Roll
        </div>
        <div className='all-cameraroll-images'>

            {
            userImages &&
            userImages.map((image)=> (

                <div key={image.id}  className='image-cameraroll-container'>
                    <img alt={image.content} onClick={()=>redirect(image.id)} className='image-cameraroll' src={image.imageUrl}/>
                </div>
            ))
            }
        </div>



    </div>
  );

}

export default CameraRoll
