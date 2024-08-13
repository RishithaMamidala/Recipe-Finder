import { FETCH_FAVORITES_FAILURE,
    FETCH_FAVORITES_REQUEST,
    FETCH_FAVORITES_SUCCESS,
    ADD_FAVORITES_FAILURE,
    ADD_FAVORITES_REQUEST,
    ADD_FAVORITES_SUCCESS,
    REMOVE_FAVORITES_FAILURE,
    REMOVE_FAVORITES_REQUEST,
    REMOVE_FAVORITES_SUCCESS,
    FETCH_FAV_RECIPES_INFORMATION_FAILURE,
    FETCH_FAV_RECIPES_INFORMATION_REQUEST,
    FETCH_FAV_RECIPES_INFORMATION_SUCCESS
 } from "./ActionType";
import axios from 'axios';
import { API_URL } from '../../../Config/api'; 

export const fetchFavorites = () => async (dispatch, getState) => {
    dispatch({ type: FETCH_FAVORITES_REQUEST });

    try {
        const { loginUser } = getState(); // Assuming your auth reducer stores the token
        const config = {
            headers: {
                'Authorization': `Bearer ${loginUser.token}` // Include the token in the request headers
            }
        };
        // console.log(config)
        
        const response = await axios.get(`${API_URL}/favorites/list_favorites/`, config);

        if (response && response.data) {
            dispatch({ type: FETCH_FAVORITES_SUCCESS, payload: response.data });
            
        } else {
            dispatch({ type: FETCH_FAVORITES_FAILURE, payload: 'Empty response from server' });
        }
    } catch (error) {
        console.log('Error fetching favorites:', error);
        dispatch({ type: FETCH_FAVORITES_FAILURE, payload: error.message });
    }
};

// export const addToFavorites = (recipeId) => async (dispatch, getState) => {
//     dispatch({ type: ADD_FAVORITES_REQUEST });

//     try {
//         const { loginUser } = getState(); // Assuming your auth reducer stores the token
//         const config = {
//             headers: {
//                 'Authorization': `Bearer ${loginUser.token}` // Include the token in the request headers
//             }
//         };

//         const body = {
//             recipe_id: recipeId // Assuming server expects recipe_id in the body to add to favorites
//         };

//         const response = await axios.post(`${API_URL}/favorites/add_to_favorites/`, body, config);
//         console.log('addtofavaction',response.data)
//         if (response && response.data) {
//             dispatch({ type: ADD_FAVORITES_SUCCESS, payload: response.data });
//             // Optionally fetch updated favorites list after adding
//             // dispatch(fetchFavorites());
//             console.log("dd")
//         } else {
//             dispatch({ type: ADD_FAVORITES_FAILURE, payload: 'Empty response from server' });
//         }
//     } catch (error) {
//         console.error('Error adding to favorites:', error);
//         dispatch({ type: ADD_FAVORITES_FAILURE, payload: error.message });
//     }
// };

export const addToFavorites = (recipeId) => async (dispatch, getState) => {
  dispatch({ type: ADD_FAVORITES_REQUEST });

  try {
      const { loginUser } = getState();
      if (!loginUser || !loginUser.token) {
          throw new Error('User token not available');
      }

      const config = {
          headers: {
              'Authorization': `Bearer ${loginUser.token}`
          }
      };

      const body = {
          recipe_id: recipeId
      };

      const response = await axios.post(`${API_URL}/favorites/add_to_favorites/`, body, config);

      if (response && response.data) {
          if (response.data.status === 'added') {
              dispatch({ type: ADD_FAVORITES_SUCCESS, payload: response.data });
              return { success: true, message: 'Added to favorites' };
          } else if (response.data.status === 'already_added') {
              return { success: false, message: 'Recipe is already in favorites' };
          } else {
              dispatch({ type: ADD_FAVORITES_FAILURE, payload: 'Unknown response status' });
              return { success: false, message: 'Failed to add to favorites' };
          }
      } else {
          dispatch({ type: ADD_FAVORITES_FAILURE, payload: 'Empty response from server' });
          return { success: false, message: 'Failed to add to favorites' };
      }
  } catch (error) {
      dispatch({ type: ADD_FAVORITES_FAILURE, payload: error.message });
      return { success: false, message: 'Failed to add to favorites. Please try again later.' };
  }
};


export const removeFromFavorites = (recipeId) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_FAVORITES_REQUEST });

  try {
    const { loginUser } = getState(); // Assuming your auth reducer stores the token
    const config = {
      headers: {
        'Authorization': `Bearer ${loginUser.token}`
      }
    };

    const body = {
      recipe_id: recipeId
    };

    const response = await axios.post(`${API_URL}/favorites/remove_from_favorites/`, body, config);

    if (response && response.data && response.data.recipe_id) {
      dispatch({ type: REMOVE_FAVORITES_SUCCESS, payload: response.data });
      // Optionally fetch updated favorites list after removing
      // dispatch(fetchFavorites());
      console.log('favorites state', getState().favorites);
      return true; // Indicate successful removal (optional)
    } else {
      dispatch({ type: REMOVE_FAVORITES_FAILURE, payload: 'Empty response from server' });
      throw new Error('Empty response from server'); // Throw error for catching in handleRemoveFavorite
    }
  } catch (error) {
    console.error('Error removing from favorites:', error);
    dispatch({ type: REMOVE_FAVORITES_FAILURE, payload: error.message });
    throw error; // Re-throw for potential error handling in handleRemoveFavorite
  }
};
 
export const fetchFavRecipesInformation = (recipeIds) => {
  return async (dispatch, getState) => {
      dispatch({
          type: FETCH_FAV_RECIPES_INFORMATION_REQUEST,
      });

      try {
          const recipePromises = recipeIds.map(id => axios.get(`${API_URL}/recipes/recipes_information/${id}/`));
          const recipeResponses = await Promise.all(recipePromises);
          const recipes = recipeResponses.map(response => response.data);

          // // Merging with existing recipes in state
          // const currentState = getState();
          // const existingRecipes = currentState.favoritesInformation.recipes || [];

          // console.log('eee', existingRecipes);

          // const updatedRecipes = [...existingRecipes, ...recipes.filter(newRecipe => !existingRecipes.some(recipe => recipe.id === newRecipe.id))];

          dispatch({
              type: FETCH_FAV_RECIPES_INFORMATION_SUCCESS,
              payload: recipes,
          });
      } catch (error) {
          dispatch({
              type: FETCH_FAV_RECIPES_INFORMATION_FAILURE,
              payload: error.message,
          });
      }
  };
};