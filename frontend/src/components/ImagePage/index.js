import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useHistory, useParams } from 'react-router-dom';
import { removeImage, editImage, getAllImages} from '../../store/images';
import { newFavorite, removeFavorite, getFavorites } from '../../store/favorites';
import './ImagePage.css';
import CommentsContainer from '../CommentsContainer';
import GenericError from '../GenericErrorModal';


function ImagePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const {imageId} = useParams()
  const myImage = useSelector(state => state.images[imageId])
  const allUserFavorites = useSelector(state => state.favorites)
  const allUserFavoritesValues = Object.values(allUserFavorites)
  const isFavorited = allUserFavoritesValues.find((ele)=>{
    return ele.imageId === +imageId
  })

  // const areComments = useSelector(state => state.comments)

  const history = useHistory()



  const [editContent, setEditContent] = useState(false);
  const [description, setDescription] = useState(myImage?.content);
  const [title, setTitle] = useState(myImage?.title);
  const [showDesModal, setShowDesModal] = useState(false);
  const [errors, setErrors] = useState([]);



  useEffect(()=> {
    dispatch(getAllImages())
    if (sessionUser) dispatch(getFavorites(sessionUser.id))

    // .then(()=>{
    //   if (!myImage){
    //           history.push('/404')
    //       }
    // })



  },[dispatch,imageId, sessionUser])

 useEffect(()=> {
    if (myImage) {

        setDescription(myImage.content)
        setTitle(myImage.title)
    }
 },[myImage])


  const deleteImage = (imageId) => {
    let result = window.confirm("This photo will be gone forever. Are you Sure?");
    if (result) {
        dispatch(removeImage(imageId))
        history.push('/cameraroll')
    }

  }

const editDescription = async(e) => {
    e.preventDefault()
    setErrors([]);
    await dispatch(editImage(imageId, description, title))
    .then(()=>{
      setDescription(myImage.content)

      setEditContent(false)
    })
    .catch(async (res) => {
        const data = await res.json();

        if (data && data.errors){
            setErrors(data.errors)
        if (!showDesModal) setShowDesModal((oldstate)=>{
            return true});

            return
        }
        setTitle(myImage.title)
      });
}

const favoriteThisImage = async(imageId) => {

  if (!sessionUser) {
    history.push('/login')
  }

  else if(!isFavorited) {
    await dispatch(newFavorite({userId: sessionUser.id, imageId}))

  }
  else{
    await dispatch(removeFavorite(isFavorited.id))
  }


}






  return (

    <div id='image-page'>
        <GenericError showModal={showDesModal} setShowModal={setShowDesModal} errors={errors}/>
      <div className='view-single-image'>

        {
            < >
                <img alt ={myImage?.content} className='image-alone' src={myImage?.imageUrl}/>
                {myImage &&
                <div id='img-buttons'>

                    <div className='delete-holder'>

                      <button id='img-delete' onClick={()=>favoriteThisImage(myImage.id)}
                      >{isFavorited ? <i className="fa fa-star fa-2x" aria-hidden="true"></i> : <i className="fa fa-star-o fa-2x" aria-hidden="true"></i>}</button>

                    </div>
                    <div className='delete-holder'>

                      <button id='img-delete' onClick={()=>deleteImage(myImage.id)}
                      style={{visibility: myImage.userId === sessionUser?.id ? "visible" : "hidden"}}><i className="fa fa-trash fa-2x" aria-hidden="true"></i></button>

                    </div>
                    </div>}
            </>

        }
    </div>
        <div className='single-image-details'>
            {myImage &&
                    <div className='image-detail-box'>
                        <div className='username-box'>
                            <h3 >{myImage.User?.username}</h3>

                        </div>
                        {!editContent &&
                        <div className={myImage.userId === sessionUser?.id ? 'description-and-button' : 'description-and-button-nouser'}>

                            <div className='title-and-description'>
                            {myImage.title ?
                            <h4 id='image-title-span'>{myImage.title}</h4>
                            : myImage.userId === sessionUser?.id ? <h4 id='no-title'>Add Title</h4> : <h4 id='no-title'>No Title</h4> }


                            {myImage.content?
                              <span>{myImage.content}</span> :
                              myImage.userId === sessionUser?.id ?  <p>Add a description</p> : <p>No description</p>  }
                            </div>
                            <button
                            className='comment-hidden-bttn'
                            onClick={()=>setEditContent(true)}
                            style={{visibility: myImage.userId === sessionUser?.id ? "visible" : "hidden"}}><i className="fas fa-edit"></i></button>
                        </div> }
                    </div>
                        }


            {editContent &&
            <div className='edit-description-box'>
                  <form
                      onSubmit={editDescription}
                      // onBlur={() => {
                      //     setEditContent(false);
                      //     setDescription(myImage.content)
                      //     setTitle(myImage.title)
                      // }}
                      >
                      <textarea
                        id='title-textarea'
                        name='title'
                        onChange={(e) => { setTitle(e.target.value) }}
                        value={title}

                      >{title}
                      </textarea>
                      <textarea
                          className='description-textarea'
                          name='description'
                          onChange={(e) => {setDescription(e.target.value)}}
                          value={description}
                      >{description}
                      </textarea>
                      <div className='edit-description-bttn-box'>
                         <button id='edit-description-bttn' className='bttn' type='submit'>Done</button>
                      </div>

                  </form>


                </div>
                }

                <CommentsContainer imageId={imageId}/>

        </div>
    </div>
  );

}

export default ImagePage
