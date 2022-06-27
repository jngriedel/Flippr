import { csrfFetch } from './csrf';


const ADD_IMAGE = 'images/addImage'
const DELETE_IMAGE = 'images/deleteImage'
const UPDATE_IMAGE = 'images/updateImage'
const LOAD = '/images/loadImages'

const load = list => ({
    type: LOAD,
    payload: list
  });

const addImage = (image) => {
    return {
        type: ADD_IMAGE,
        payload: image,
    };
};


const deleteImage = (imageId) => {
    return {
        type: DELETE_IMAGE,
        payload: imageId
    }
}


const updateImage = (image) => {
    return {
        type: UPDATE_IMAGE,
        payload: image,
    };
};


export const getImages = (userId) => async dispatch => {

    const response = await csrfFetch(`/api/cameraroll/${userId}`)

    if (response.ok){
    const userImages = await response.json();
    dispatch(load(userImages))
    return userImages
    }
}

export const getSingleImage = (imageId) => async dispatch => {

    const response = await csrfFetch(`/api/images/${imageId}`)

    if (response.ok){
    const image = await response.json();
    dispatch(load(image))
    return image
    }
}

export const uploadImage = (image) => async dispatch => {
    const {imageUrl, content, userId} = image;
    const response = await csrfFetch('/api/images/upload', {
        method: 'POST',
        body: JSON.stringify({
            imageUrl,
            content,
            userId
        })
    })
    if (response.ok){
    const data = await response.json();
    dispatch(addImage(data))
    return data
    }
}
export const removeImage = (imageId) => async dispatch => {

    const response = await csrfFetch(`/api/images/${imageId}`, {
        method: 'DELETE',

    })
    if (response.ok){
    dispatch(deleteImage(imageId))
    return imageId
    }
}

export const editImage = (imageId, content) => async dispatch => {

    const response = await csrfFetch(`/api/images/${imageId}`, {
        method: 'PUT',
        body: JSON.stringify({
            content,
        })

    })
    if (response.ok){
        const image = await response.json()

        dispatch(updateImage(image))
        return image
    }
}



const initialState = {};

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_IMAGE: {
        const newState = {...state};
        newState[action.payload.id] = action.payload;
        return newState;
      }
      case DELETE_IMAGE: {
        const newState = {...state}
        delete newState[action.payload]
        return newState;
      }
      case LOAD: {
        const newState = {...state}
         action.payload.forEach((image)=> {
            newState[image.id] = image
         })
        return newState;
      }
      case UPDATE_IMAGE: {
        const newState = {...state}
        newState[action.payload.id] = action.payload
        return newState;
      }
      default:
        return state;
    }
  };

  export default imageReducer;
