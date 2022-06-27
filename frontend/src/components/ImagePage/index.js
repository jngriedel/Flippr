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



  const deleteImage = (imageId) => {
    let result = window.confirm("This photo will be gone forever. Are you Sure?");
    if (result) {
        dispatch(removeImage(imageId))
        history.push('/cameraroll')
    }

  }

const editDescription = (imageId) => {

    dispatch(editImage(imageId, description))
    setEditContent(false)
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
                    style={{visibility: myImage.userId === sessionUser.id ? "visible" : "hidden"}}><i class="fas fa-edit"></i></button>
                    </>
                        }
                    {editContent &&
                    <>
                    <form onSubmit={()=>editDescription(myImage.id)}>
                        <textarea
                        name='description'
                        onChange={(e)=>{setDescription(e.target.value)}}
                        onBlur={()=>{setEditContent(false);
                            setDescription(myImage.content)}}

                        value={description}
                        >{description}
                        </textarea>
                    </form>
                        <button className='bttn' onClick={()=>editDescription(myImage.id)}>Done</button>
                        {/* <button onClick={()=>{setEditContent(false);
                        setDescription(myImage.content)}}>Cancel</button> */}
                        </>
                        }
                    {myImage &&
                    <div>
                      <button onClick={()=>deleteImage(myImage.id)}
                      style={{visibility: myImage.userId === sessionUser.id ? "visible" : "hidden"}}><i class="fa fa-trash" aria-hidden="true"></i></button>

                    </div>}



                    <CommentsContainer imageId={imageId}/>



        </div>
    </div>
  );

}

export default ImagePage
