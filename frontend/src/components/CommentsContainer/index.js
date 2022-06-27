
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getComments, editComment, removeComment, uploadComment} from '../../store/comments';
import './CommentsContainer.css'




function CommentsContainer ({imageId}) {

    const [showCommentButton, setShowCommentButton] = useState("hidden")
    const [body, setBody] = useState("")
    const sessionUser = useSelector(state => state.session.user);
    const commentsObj = useSelector(state => state.comments)
    const comments = Object.values(commentsObj)

    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getComments(imageId))
    },[])

    const handleSubmit = async(e) => {
        e.preventDefault();

        const payload = {
            body,
            imageId,
            userId : sessionUser.id
        }
        const response = await dispatch(uploadComment(payload))


        if (response) {
            setBody('')
            setShowCommentButton("hidden")
        }


      }


    return (

    <div className='comments-container'>
        <div className='comments'>
            {
            comments &&
            comments.map((comment)=> (

                <div key={comment.id} className='single-comment-container'>
                    <p className='image-cameraroll' >{comment.body}</p>
                    <button
                    style={{ visibility: sessionUser.id === comment.userId ? "visible" : "hidden" }}>
                        Edit
                        </button>
                    <button
                    style={{ visibility: sessionUser.id === comment.userId ? "visible" : "hidden" }}
                    >Delete</button>
                </div>
            ))
            }

        </div>
        <div className='comment-input'>
            <form onSubmit={handleSubmit}>
                <textarea
                onFocus={()=>setShowCommentButton("visible")}
                onBlur={()=>{if (!body)setShowCommentButton("hidden")}}
                onChange={(e)=>{setBody(e.target.value)} }
                placeholder='Add a Comment'>
                    {body}
                </textarea>
                <button className='bttn'
                style={{ visibility: showCommentButton }}
                type='submit'  >Comment</button>
            </form>
        </div>
    </div>
    )

}


export default CommentsContainer
