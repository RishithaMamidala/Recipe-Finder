import axios from 'axios';
import {
    FETCH_RECIPES_REQUEST,
    FETCH_RECIPES_SUCCESS,
    FETCH_RECIPES_FAILURE,
    FETCH_RECIPES_BY_INGREDIENTS_FAILURE,
    FETCH_RECIPES_BY_INGREDIENTS_REQUEST,
    FETCH_RECIPES_BY_INGREDIENTS_SUCCESS,
    SET_SEARCH_QUERY,
    CLEAR_SEARCH_QUERY,
    FETCH_RECIPES_INFORMATION_FAILURE,
    FETCH_RECIPES_INFORMATION_REQUEST,
    FETCH_RECIPES_INFORMATION_SUCCESS,
    RESET_RECIPE_INFORMATION
} from './ActionType';
import { API_URL } from '../../../Config/api'; 

export const fetchRecipes = () => async (dispatch) => {
    dispatch({ type: FETCH_RECIPES_REQUEST }); 
    try {
        const response = await axios.get(`${API_URL}/recipes/random_recipes/`);
        dispatch({ type: FETCH_RECIPES_SUCCESS, payload: response.data.recipes });
    } catch (error) {
        // console.error('Error fetching random recipes:', error);
        dispatch({ type: FETCH_RECIPES_FAILURE, payload: error.message });
    }
};

export const fetchRecipesByIngredients = (ingredients) => async (dispatch) => {
    dispatch({ type: FETCH_RECIPES_BY_INGREDIENTS_REQUEST });
    try {
        const response = await axios.post(`${API_URL}/recipes/recipes_by_ingredients/`, { ingredients });
        // console.log(response)
        dispatch({ type: FETCH_RECIPES_BY_INGREDIENTS_SUCCESS, payload: response.data });
    } catch (error) {
        // console.error('Error fetching recipes by ingredients:', error);
        dispatch({ type: FETCH_RECIPES_BY_INGREDIENTS_FAILURE, payload: error.message });
    }
};

export const fetchRecipesInformation = (id) => async (dispatch) => {
    dispatch({ type: FETCH_RECIPES_INFORMATION_REQUEST }); 
    try {
        const response = await axios.get(`${API_URL}/recipes/recipes_information/${id}/`);
        // console.log('information',response.data)
        dispatch({ type: FETCH_RECIPES_INFORMATION_SUCCESS, payload: response.data });
    } catch (error) {
        // console.error('Error fetching random recipes:', error);
        dispatch({ type: FETCH_RECIPES_INFORMATION_FAILURE, payload: error.message });
    }
};

export const setSearchQuery = (query) => ({
    type: SET_SEARCH_QUERY,
    payload: query,
  });
  
export const clearSearchQuery = () => ({
    type: CLEAR_SEARCH_QUERY,
});

export const resetRecipeInformation = () => ({
    type: RESET_RECIPE_INFORMATION,
});

export const handleSearch = (query) => (dispatch) => {
    if (query.trim() !== '') {
      dispatch(setSearchQuery(query));
      dispatch(fetchRecipesByIngredients(query));
    } else {
      dispatch(clearSearchQuery());
      dispatch(fetchRecipes());
    }
};

export const clearSearch = () => (dispatch) => {
    dispatch(clearSearchQuery());
    dispatch(fetchRecipes());
}
