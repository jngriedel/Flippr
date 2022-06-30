import React, {  useEffect } from 'react';
// import * as imagesActions from '../../store/images';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
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
            <div className='banner-info'>
            <h1 id='cameraroll-username'>{sessionUser.username}</h1>
            <p id='cameraroll-photocount'>{userImages?.length}
            {userImages?.length === 1 && ' Photo'}
            { userImages.length > 1 &&
            ' Photos'}
            {userImages.length === 0 && ' Photos'}
            </p>
            </div>
        </div>
        <div className='cameraroll-label'>
            Camera Roll
        </div>


        {userImages.length === 0 &&
            <div className='all-cameraroll-images2'>
            <div className='empty-cameraroll'>
            <h3 id='emptyMessage'>Looks empty in here. </h3>
            <h4 id='emptyMessage2'>Start by uploading your photos!</h4>
            <button className='bttn'><NavLink id='to-upload-bttn' to='/images/upload'>Upload Photos</NavLink></button>
            </div>
            </div>}
        {
        userImages.length > 0 &&
        <div className='all-cameraroll-images'>


            {userImages.map((image)=> (

                <div key={image.id}  className='image-cameraroll-container'>
                    <img alt={image.content} onClick={()=>redirect(image.id)} className='image-cameraroll' src={image.imageUrl}/>
                </div>
            ))
            }
        </div>}




    </div>
  );

}

export default CameraRoll
