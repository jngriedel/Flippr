
const ADD_IMAGE = 'images/addImage'
const DELETE_IMAGE = 'images/deleteImage'
const UPDATE_IMAGE = 'images/updateImage'

const addImage = (image) => {
    return {
        type: ADD_IMAGE,
        payload: image,
    };
};


const deleteImage = () => {
    return {
        type: DELETE_IMAGE
    }
}


const updateImage = (image) => {
    return {
        type: UPDATE_IMAGE,
        payload: image,
    };
};


export const uploadImage = (image) => async dispatch => {
    const {imageUrl, content, userId} = image;
    const response = await fetch('/api/images/upload', {
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



const initialState = {};

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_IMAGE:
        const newState = {...state};
        newState[action.payload.id] = action.payload;
        return newState;
    //   case REMOVE_USER:
    //     newState = Object.assign({}, state);
    //     newState.user = null;
    //     return newState;
      default:
        return state;
    }
  };

  export default imageReducer;
