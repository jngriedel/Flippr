import React, { useState, useEffect } from 'react';
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
  const myImage = userImages.find((el)=>{
    return el.id === +imageId
  })


  const [editContent, setEditContent] = useState(false);
  const [description, setDescription] = useState(myImage?.content);

  useEffect(()=> {
     dispatch(getSingleImage(imageId))

  },[])



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
            {!editContent &&
                    <>
                    <span>{myImage?.content}</span>
                    <button
                    onClick={()=>setEditContent(true)}
                    style={{visibility: myImage.userId === sessionUser.id ? "visible" : "hidden"}}>Edit Description</button>
                    </>
                        }
                    {editContent &&
                    <>
                    <form onSubmit={()=>editDescription(myImage.id)}>
                        <textarea
                        name='description'
                        // value={description}
                        onChange={(e)=>{setDescription(e.target.value)}}
                        >{description}
                        </textarea>
                        </form>
                        <button onClick={()=>editDescription(myImage.id)}>Save</button>
                        <button onClick={()=>setEditContent(false)}>Cancel</button>
                        </>
                        }
                    <div>
                      <button onClick={()=>deleteImage(myImage.id)}
                      style={{visibility: myImage.userId === sessionUser.id ? "visible" : "hidden"}}>Delete</button>

                    </div>


                    <CommentsContainer imageId={5}/>



        </div>
    </div>
  );

}

export default ImagePage
