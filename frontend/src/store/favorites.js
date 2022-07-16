import { csrfFetch } from './csrf';


const ADD_FAVORITE = 'favorites/addFavorite'
const DELETE_FAVORITE = 'favorites/deleteFavorite'

const LOAD = 'favorites/load'
const CLEAR = 'favorites/clear'


export const clearFavorites = () => ({
    type: CLEAR
});

const loadFavorites = list => ({
    type: LOAD,
    payload: list
  });

const addFavorite = (favorite) => {
    return {
        type: ADD_FAVORITE,
        payload: favorite,
    };
};


const deleteFavorite = (favoriteId) => {
    return {
        type: DELETE_FAVORITE,
        payload: favoriteId
    }
}





export const getFavorites = (userId) => async dispatch => {

    const response = await csrfFetch(`/api/favorites/${userId}`)

    if (response.ok){
    const favorites = await response.json();
    dispatch(loadFavorites(favorites))
    return favorites
    }
}

export const newFavorite = (payload) => async dispatch => {
    const {userId, imageId} = payload;
    const response = await csrfFetch('/api/favorites', {
        method: 'POST',
        body: JSON.stringify({
            userId,
            imageId,

        })
    })
    if (response.ok){
    const data = await response.json();
    dispatch(addFavorite(data))
    return data
    }

}
export const removeFavorite = (favoriteId) => async dispatch => {

    const response = await csrfFetch(`/api/favorites/${favoriteId}`, {
        method: 'DELETE',

    })
    if (response.ok){
    dispatch(deleteFavorite(favoriteId))
    return favoriteId
    }
}





const initialState = {};

const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_FAVORITE: {
        const newState = {...state};
        newState[action.payload.id] = action.payload;
        return newState;
      }
      case DELETE_FAVORITE: {
        const newState = {...state}
        delete newState[action.payload]
        return newState;
      }
      case LOAD: {
        const newState = {}
         action.payload.forEach((favorite)=> {
            newState[favorite.id] = favorite
         })
        return newState;
      }
      case CLEAR: {
        return {};
      }
      default:
        return state;
    }
  };

  export default favoritesReducer
