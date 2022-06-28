import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editComment, removeComment,} from '../../store/comments';
import CommentError from '../CommentErrorModal/index';




function SingleComment ({comment}) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const [editContent, setEditContent] = useState(false);
    const [currentComment, setCurrentComment] = useState(comment.body)
    const [showModal, setShowModal] = useState(false);
    const onDelete = (commentId) => {

        let result = window.confirm("Delete this Comment?");
        if (result) {
            dispatch(removeComment(commentId))

        }

      }


    const changeComment = (e)=> {
        e.preventDefault()

       dispatch(editComment(comment.id, currentComment))
       .catch(async (res) => {
        const data = await res.json();

        if (data && data.errors){
        setCurrentComment(comment.body)
        if (!showModal) setShowModal((oldstate)=>{
            return true});}
      });

      setEditContent(false)


    }

    return (
        <>
          {showModal && <CommentError showModal={showModal} setShowModal={setShowModal} />}
            {!editContent &&

                <div key={comment.id} className='single-comment-container'>
                    <div className='comment-and-user'>
                        <h4 id='comment-user'>{comment.User?.username}</h4>
                        <div className='comment-body' >{comment.body}</div>
                    </div>
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
                </div>
            }
            {editContent &&
            <>
                <form onSubmit={changeComment}
                // onBlur={() => {
                //     setEditContent(false);
                //     setCurrentComment(comment.body)
                // }}
                >
                    <textarea
                        name='currentComment'

                        onChange={(e) => { setCurrentComment(e.target.value) }}


                        value={currentComment}
                    >{currentComment}
                    </textarea>
                    <button className='bttn' type='submit'>Done</button>
                </form>

            </>
            }
        </>
)
}

export default SingleComment
