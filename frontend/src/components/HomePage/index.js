import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {getAllImages} from '../../store/images';


function HomePage() {
  const dispatch = useDispatch();
//   const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()


  useEffect(()=> {

    dispatch(getAllImages())

  },[dispatch])

  const redirect = (imageId) => {
    history.push(`/images/${imageId}`)
  }

  const allImagesObj = useSelector(state => state.images)
  const allImages = Object.values(allImagesObj)






  return (
    <div className='cameraroll-main'>
        <div className='banner-cameraroll'></div>
        <div className='all-cameraroll-images'>

            {
            allImages &&
            allImages.map((image)=> (

                <div key={image.id} className='image-cameraroll-container'>
                    <img alt={image.content} onClick={()=>redirect(image.id)} className='image-cameraroll' src={image.imageUrl}/>
                </div>
            ))
            }
        </div>



    </div>
  );

}

export default HomePage
