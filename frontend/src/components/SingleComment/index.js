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


    const changeComment = async(e)=> {
        e.preventDefault()

        const response = await dispatch(editComment(comment.id, currentComment))
        if (response) {
        setEditContent(false)
        }
    }

    return (
        <>
            {!editContent &&

                <div key={comment.id} className='single-comment-container'>
                    <p className='image-cameraroll' >{comment.body}</p>
                    <button
                        style={{ visibility: sessionUser?.id === comment.userId ? "visible" : "hidden" }}
                        onClick={()=>setEditContent(true)}>
                        <i className="fas fa-edit"></i>
                    </button>
                    <button
                        style={{ visibility: sessionUser?.id === comment.userId ? "visible" : "hidden" }}
                        onClick={() => onDelete(comment.id)}
                    ><i className="fa fa-trash" aria-hidden="true"></i></button>
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
