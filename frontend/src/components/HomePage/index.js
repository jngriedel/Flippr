import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {getAllImages} from '../../store/images';
import {clearComments} from '../../store/comments'
import './Homepage.css'

function HomePage() {
  const dispatch = useDispatch();
//   const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()


  useEffect(()=> {

    dispatch(getAllImages())
    dispatch(clearComments())

  },[dispatch])

  const redirect = (imageId) => {
    history.push(`/images/${imageId}`)
  }

  const allImagesObj = useSelector(state => state.images)
  const allImages = Object.values(allImagesObj)






  return (
    <div className='homepage-main'>
        <h1 id='homepage-message'>Explore the Magic of the Ocean!</h1>
        <div className='all-cameraroll-images'>

            {
            allImages &&
            allImages.map((image)=> (

                <div key={image.id} className='image-homepage-container'>
                    <div className='image-homepage-user'>{image.User?.username}</div>
                    <img alt={image.content} onClick={()=>redirect(image.id)} className='image-homepage' src={image.imageUrl}/>
                    <div className='image-homepage-description'>{image.content}</div>
                </div>
            ))
            }
        </div>



    </div>
  );

}

export default HomePage
