import React, {  useEffect, useState } from 'react';
// import * as imagesActions from '../../store/images';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
// import {getImages, } from '../../store/images';
import {clearComments} from '../../store/comments'
import { getFavorites } from '../../store/favorites';
import '../CameraRoll/CameraRoll.css'


function Favorites() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()
  const [renderPage, setRenderPage] = useState(false)
  const {userId} = useParams()
  const userFavoritesObj = useSelector(state => state.favorites)
  const favorites2display = Object.values(userFavoritesObj).map((fav)=>{
    return fav['Image']
  })


  useEffect(()=> {

    const favoritesstartup = async()=> {
      
      await dispatch(getFavorites(userId))
      dispatch(clearComments())
      setRenderPage(true)
    }

   favoritesstartup()


  },[dispatch, userId])



  const redirect = (imageId) => {
    history.push(`/images/${imageId}`)
  }







  return (
    renderPage &&
    <div className='cameraroll-main'>
        <div className='banner-cameraroll'>
            <div className='banner-info'>
            <h1 id='cameraroll-username'>{`${sessionUser.username}'s Favorites`}</h1>
            <p id='cameraroll-photocount'>{favorites2display?.length}
            {favorites2display?.length === 1 && ' Photo'}
            { favorites2display.length > 1 &&
            ' Photos'}
            {favorites2display.length === 0 && ' Photos'}
            </p>
            </div>
        </div>
        <div className='cameraroll-label'>
            <NavLink to='/cameraroll' className='profile-section-link'>Camera Roll</NavLink>
            <NavLink to={`/${sessionUser.id}/favorites`}  className='profile-section-link-selected'>Favorites</NavLink>
        </div>


        {favorites2display.length === 0 &&
            <div className='all-cameraroll-images2'>
            <div className='empty-cameraroll'>
            <h3 id='emptyMessage'>Looks empty in here. </h3>
            <h4 id='emptyMessage2'>Go favorite some Fish!</h4>
            <NavLink id='to-upload-bttn' to='/'><button className='bttn'>Explore Images</button></NavLink>
            </div>
            </div>}
        {
        favorites2display.length > 0 &&
        <div className='all-cameraroll-images'>


            {favorites2display.map((image)=> (

                <div key={image.id}  className='image-cameraroll-container'>
                    <img alt={image.content} onClick={()=>redirect(image.id)} className='image-cameraroll' src={image.imageUrl}/>
                </div>
            ))
            }
        </div>}




    </div>


  );

}

export default Favorites
