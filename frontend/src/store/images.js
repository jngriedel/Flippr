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
export const getAllImages = () => async dispatch => {

    const response = await csrfFetch(`/api/images`)

    if (response.ok){
    const allImages = await response.json();
    dispatch(load(allImages))
    return allImages
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

export const uploadImage = (input) => async dispatch => {
    const {image, images, content, userId} = input;

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("content", content);

    if (images && images.length !== 0) {
        for (var i = 0; i < images.length; i++) {
          formData.append("images", images[i]);
        }
      }

    if (image) formData.append("image", image);


    const response = await csrfFetch('/api/images/upload', {
        method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
    });

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

export const editImage = (imageId, content, title) => async dispatch => {

    const response = await csrfFetch(`/api/images/${imageId}`, {
        method: 'PUT',
        body: JSON.stringify({
            content,
            title
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
        action.payload.forEach((image)=>{
            newState[image.id] = image;
        })

        return newState;
      }
      case DELETE_IMAGE: {
        const newState = {...state}
        delete newState[action.payload]
        return newState;
      }
      case LOAD: {
        const newState = {}
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
