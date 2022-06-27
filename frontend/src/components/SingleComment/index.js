import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editComment, removeComment,} from '../../store/comments';





function SingleComment ({comment}) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const [editContent, setEditContent] = useState(false);
    const [currentComment, setCurrentComment] = useState(comment.body)

    const onDelete = (commentId) => {

        let result = window.confirm("Delete this Comment?");
        if (result) {
            dispatch(removeComment(commentId))

        }

      }


    const editComment = ()=> {
        dispatch(editComment(comment.id, currentComment))
    }

    return (
        <>
            {!editContent &&

                <div key={comment.id} className='single-comment-container'>
                    <p className='image-cameraroll' >{comment.body}</p>
                    <button
                        style={{ visibility: sessionUser.id === comment.userId ? "visible" : "hidden" }}
                        onClick={()=>setEditContent(true)}>
                        <i className="fas fa-edit"></i>
                    </button>
                    <button
                        style={{ visibility: sessionUser.id === comment.userId ? "visible" : "hidden" }}
                        onClick={() => onDelete(comment.id)}
                    ><i className="fa fa-trash" aria-hidden="true"></i></button>
                </div>
            }
            {editContent &&
            <>
                <form >
                    <textarea
                        name='currentComment'
                        onChange={(e) => { setCurrentComment(e.target.value) }}
                        onBlur={() => {
                            setEditContent(false);
                            setCurrentComment(comment.body)
                        }}

                        value={currentComment}
                    >{currentComment}
                    </textarea>
                </form>
                <button className='bttn' onClick={()=>editComment()}>Done</button>
            </>
            }
        </>
)
}

export default SingleComment
