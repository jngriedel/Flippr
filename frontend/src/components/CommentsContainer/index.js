
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getComments, addComment, editComment} from '../../store/images';
import './CommentsContainer.css'




function CommentsContainer () {

    const [showCommentButton, setShowCommentButton] = useState("hidden")
    const [comment, setComment] = useState("")




    return (

    <div className='comments-container'>
        <div className='comments'>

        </div>
        <div className='comment-input'>
            <form>
                <textarea
                onFocus={()=>setShowCommentButton("visible")}
                onBlur={()=>{if (!comment)setShowCommentButton("hidden")}}
                onChange={(e)=>{setComment(e.target.value)} }
                placeholder='Add a Comment'>
                    {comment}
                </textarea>
                <button className='bttn' style={{ visibility: showCommentButton }}  >Comment</button>
            </form>
        </div>
    </div>
    )

}


export default CommentsContainer
