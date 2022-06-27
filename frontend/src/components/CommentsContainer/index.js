
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getComments,  uploadComment} from '../../store/comments';
import './CommentsContainer.css'
import SingleComment from '../SingleComment';





function CommentsContainer ({imageId}) {
    const [editContent, setEditContent] = useState(false);
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
            setBody("")
            setShowCommentButton("hidden")
        }
      }





    return (

    <div className='comments-container'>
        <div className='comments'>
            {
            comments &&
            comments.map((comment)=> (
                <SingleComment comment={comment}/>
            ))
            }

        </div>
        <div className='comment-input'>
            <form onSubmit={handleSubmit}>
                <textarea
                onFocus={()=>setShowCommentButton("visible")}
                onBlur={()=>{if (!body)setShowCommentButton("hidden")}}
                onChange={(e)=>{setBody(e.target.value)} }
                value={body}
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
