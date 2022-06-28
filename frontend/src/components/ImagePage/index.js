import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useHistory, useParams } from 'react-router-dom';
import {getSingleImage, removeImage, editImage} from '../../store/images';
import './ImagePage.css';
import CommentsContainer from '../CommentsContainer';


function ImagePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const userImagesObj = useSelector(state => state.images)
  const userImages = Object.values(userImagesObj)
  const history = useHistory()
  const {imageId} = useParams()
  const myImage = userImages.find((image)=>{
    return image.id === +imageId
  })


  const [editContent, setEditContent] = useState(false);
  const [description, setDescription] = useState(myImage?.content);





  useEffect(()=> {
    dispatch(getSingleImage(imageId))

  },[dispatch])

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
    const response = await dispatch(editImage(imageId, description))
    if (response) {
    setEditContent(false)
    }
}






  return (
    <div id='image-page'>
      <div className='view-single-image'>

        {
            <div >
                <img className='image-alone' src={myImage?.imageUrl}/>

            </div>

        }
    </div>
        <div className='single-image-details'>
            {!editContent && myImage &&
                    <>
                    <span>{myImage?.content}</span>
                    <button
                    onClick={()=>setEditContent(true)}
                    style={{visibility: myImage.userId === sessionUser?.id ? "visible" : "hidden"}}><i className="fas fa-edit"></i></button>
                    </>
                        }


            {editContent && myImage &&
            <>
                  <form
                      onSubmit={editDescription}
                    //   onBlur={() => {
                    //       setEditContent(false);
                    //       setDescription(myImage.content)
                    //   }}
                      >

                      <textarea
                          name='description'
                          onChange={(e) => {setDescription(e.target.value)}}
                          value={description}
                      >{description}
                      </textarea>
                      <button className='bttn' type='submit'>Done</button>
                  </form>


                </>
                }
                    {myImage &&
                    <div>
                      <button onClick={()=>deleteImage(myImage.id)}
                      style={{visibility: myImage.userId === sessionUser?.id ? "visible" : "hidden"}}><i className="fa fa-trash" aria-hidden="true"></i></button>

                    </div>}



                    <CommentsContainer imageId={imageId}/>



        </div>
    </div>
  );

}

export default ImagePage
