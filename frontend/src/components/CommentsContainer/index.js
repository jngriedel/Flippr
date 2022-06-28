
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getComments,  uploadComment} from '../../store/comments';
import './CommentsContainer.css'
import SingleComment from '../SingleComment';
import CommentError from '../CommentErrorModal/index';





function CommentsContainer ({imageId}) {
    const [showModal, setShowModal] = useState(false);
    const [showCommentButton, setShowCommentButton] = useState("hidden")
    const [body, setBody] = useState("")
    const sessionUser = useSelector(state => state.session.user);
    const commentsObj = useSelector(state => state.comments)
    const comments = Object.values(commentsObj)

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            body,
            imageId,
            userId : sessionUser.id
        }
        dispatch(uploadComment(payload))
        .catch(async (res) => {
            const data = await res.json();

            if (data && data.errors){

            if (!showModal) setShowModal((oldstate)=>{

                return true});}
          });

            setBody("")
            setShowCommentButton("hidden")

      }


    useEffect(()=> {
        dispatch(getComments(imageId))
    },[handleSubmit])

    







    return (

    <div className='comments-container'>
        {showModal && <CommentError showModal={showModal} setShowModal={setShowModal} />}
        <div className='comments'>
            {
            comments &&
            comments.map((comment)=> (
                <SingleComment key={comment.id} comment={comment}/>
            ))
            }

        </div>
        { sessionUser &&
        <div className='comment-input'>
            <form onSubmit={handleSubmit}>
                <textarea
                onFocus={()=>setShowCommentButton("visible")}
                // onBlur={()=>{if (!body)setShowCommentButton("hidden")}}
                onChange={(e)=>{setBody(e.target.value)} }
                className='comment-textarea'
                value={body}
                placeholder='Add a Comment'>
                    {body}
                </textarea>
                <button className='bttn'
                style={{ visibility: showCommentButton }}
                type='submit'  >Comment</button>
            </form>
        </div>}
    </div>
    )

}


export default CommentsContainer
