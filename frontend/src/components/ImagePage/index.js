import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useHistory, useParams } from 'react-router-dom';
import { removeImage, editImage, getAllImages} from '../../store/images';
import './ImagePage.css';
import CommentsContainer from '../CommentsContainer';
import GenericError from '../GenericErrorModal';


function ImagePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const {imageId} = useParams()
  const myImage = useSelector(state => state.images[imageId])
  const areComments = useSelector(state => state.comments)

  const history = useHistory()



  const [editContent, setEditContent] = useState(false);
  const [description, setDescription] = useState(myImage?.content);
  const [showDesModal, setShowDesModal] = useState(false);
  const [errors, setErrors] = useState([]);



  useEffect(()=> {
    dispatch(getAllImages())

    // if (!myImage){
    //     history.push('/404')
    // }

  },[dispatch,imageId])

 useEffect(()=> {
    if (myImage) {
        setDescription(myImage.content)
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
    await dispatch(editImage(imageId, description))
    .catch(async (res) => {
        const data = await res.json();

        if (data && data.errors){
            setErrors(data.errors)
        if (!showDesModal) setShowDesModal((oldstate)=>{
            return true});

            return
        }

      });

      setDescription(myImage.content)
      setEditContent(false)



}






  return (

    <div id='image-page'>
        <GenericError showModal={showDesModal} setShowModal={setShowDesModal} errors={errors}/>
      <div className='view-single-image'>

        {
            < >
                <img alt ={myImage?.content} className='image-alone' src={myImage?.imageUrl}/>
                {myImage &&
                    <div className='delete-holder'>
                      <button id='img-delete' onClick={()=>deleteImage(myImage.id)}
                      style={{visibility: myImage.userId === sessionUser?.id ? "visible" : "hidden"}}><i className="fa fa-trash fa-2x" aria-hidden="true"></i></button>

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
                            {myImage.content &&
                            <span>{myImage.content}</span>}
                            {!myImage.content &&
                            <p>Add a description</p>}
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
                    //   onBlur={() => {
                    //       setEditContent(false);
                    //       setDescription(myImage.content)
                    //   }}
                      >

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
