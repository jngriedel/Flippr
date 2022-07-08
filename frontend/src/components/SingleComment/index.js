import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editComment, removeComment,} from '../../store/comments';
// import CommentError from '../CommentErrorModal/index';
import GenericError from '../GenericErrorModal';




function SingleComment ({comment}) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const [editContent, setEditContent] = useState(false);
    const [currentComment, setCurrentComment] = useState(comment.body)
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState([]);


    const onDelete = (commentId) => {

        let result = window.confirm("Delete this Comment?");
        if (result) {
            dispatch(removeComment(commentId))

        }

      }


    const changeComment = (e)=> {
        e.preventDefault()
        setErrors([]);
       dispatch(editComment(comment.id, currentComment))
       .catch(async (res) => {
        const data = await res.json();

        if (data && data.errors){

        setErrors(data.errors)
        if (!showModal) setShowModal((oldstate)=>{
            return true});}
      });
      setCurrentComment(comment.body)
      setEditContent(false)


    }

    return (
        <>
          <GenericError showModal={showModal} setShowModal={setShowModal} errors={errors}/>

                <div key={comment.id} className={sessionUser?.id === comment.userId ? 'single-comment-container' : 'single-comment-container-nouser'}>
                    <div className='comment-and-user'>
                        <h4 id='comment-user'>{comment.User?.username}</h4>
                        {!editContent &&
                            <div className='comment-body' >{comment.body}</div>
                        }
                    </div>
                    {!editContent &&
                    <div className='comment-bttns'>
                        <button
                            className='comment-hidden-bttn'
                            style={{ visibility: sessionUser?.id === comment.userId ? "visible" : "hidden" }}
                            onClick={()=>setEditContent(true)}>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button
                            className='comment-hidden-bttn'
                            style={{ visibility: sessionUser?.id === comment.userId ? "visible" : "hidden" }}
                            onClick={() => onDelete(comment.id)}
                        ><i className="fa fa-trash" aria-hidden="true"></i></button>
                    </div>
                    }
                </div>

            {editContent &&
            <>
                <form onSubmit={changeComment}
                // onBlur={() => {
                //     setEditContent(false);
                //     setCurrentComment(comment.body)
                // }}
                >
                    <textarea className='comment-textarea'
                        name='currentComment'

                        onChange={(e) => { setCurrentComment(e.target.value) }}


                        value={currentComment}
                    >{currentComment}
                    </textarea>
                    <div className='add-comment-bttn-box'>
                        <button id='edit-comment-bttn' className='bttn' type='submit'>Done</button>
                    </div>
                </form>

            </>
            }
        </>
)
}

export default SingleComment
