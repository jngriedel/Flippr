import { csrfFetch } from './csrf';


const ADD_COMMENT = 'comments/addComment'
const DELETE_COMMENT = 'comments/deleteComment'
const UPDATE_COMMENT = 'comments/updateComment'
const LOAD = 'comments/loadComments'

const loadComments = list => ({
    type: LOAD,
    payload: list
  });

const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        payload: comment,
    };
};


const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        payload: commentId
    }
}


const updateComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        payload: comment,
    };
};


export const getComments = (imageId) => async dispatch => {

    const response = await csrfFetch(`/api/comments/${imageId}`)

    if (response.ok){
    const imageComments = await response.json();
    dispatch(loadComments(imageComments))
    return imageComments
    }
}

export const uploadComment = (comment) => async dispatch => {
    const {userId, imageId, body} = comment;
    const response = await csrfFetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
            userId,
            imageId,
            body
        })
    })
    if (response.ok){
    const data = await response.json();
    dispatch(addComment(data))
    return data
    }
}
export const removeComment = (commentId) => async dispatch => {

    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE',

    })
    if (response.ok){
    dispatch(deleteComment(commentId))
    return commentId
    }
}

export const editComment = (commentId, body) => async dispatch => {

    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify({
            body,
        })

    })
    if (response.ok){
        const comment = await response.json()

        dispatch(updateComment(comment))
        return comment
    }
}



const initialState = {};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_COMMENT: {
        const newState = {...state};
        newState[action.payload.id] = action.payload;
        return newState;
      }
      case DELETE_COMMENT: {
        const newState = {...state}
        delete newState[action.payload]
        return newState;
      }
      case LOAD: {
        const newState = {...state}
         action.payload.forEach((comment)=> {
            newState[comment.id] = comment
         })
        return newState;
      }
      case UPDATE_COMMENT: {
        const newState = {...state}
        newState[action.payload.id] = action.payload
        return newState;
      }
      default:
        return state;
    }
  };

  export default commentsReducer