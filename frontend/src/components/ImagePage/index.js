import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import {getImages, removeImage, editImage} from '../../store/images';
// import './CameraRoll.css';

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
     dispatch(getImages(sessionUser.id))
     
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
    <div className='all-cameraroll-images'>

        {
            <div className='image-cameraroll-container'>
                <img className='image-cameraroll' src={myImage?.imageUrl}/>
                {!editContent &&
                <>
                <span>{myImage?.content}</span>
                <button onClick={()=>setEditContent(true)}>Edit Description</button>
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
                  <button onClick={()=>deleteImage(myImage.id)}>Delete</button>

                </div>
            </div>

        }
    </div>
  );

}

export default ImagePage
