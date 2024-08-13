// Reducers.js

import {
    FETCH_RECIPES_REQUEST,
    FETCH_RECIPES_SUCCESS,
    FETCH_RECIPES_FAILURE,
    FETCH_RECIPES_BY_INGREDIENTS_REQUEST,
    FETCH_RECIPES_BY_INGREDIENTS_SUCCESS,
    FETCH_RECIPES_BY_INGREDIENTS_FAILURE, 
    SET_SEARCH_QUERY,
    CLEAR_SEARCH_QUERY,
    FETCH_RECIPES_INFORMATION_FAILURE,
    FETCH_RECIPES_INFORMATION_REQUEST,
    FETCH_RECIPES_INFORMATION_SUCCESS,
    RESET_RECIPE_INFORMATION
} from './ActionType';

const initialState = {
    randomrecipes: [],  // Ensure recipes are directly under the main state, not nested
    ingredientrecipes: [],
    loading: false,
    error: null,
    searchQuery: '',
};

export const RecipesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RECIPES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_RECIPES_SUCCESS:
            return {
                ...state,
                randomrecipes: action.payload,
                ingredientrecipes: [],
                loading: false,
                error: null
            };
        case FETCH_RECIPES_FAILURE:
            return {
                ...state,
                randomrecipes: [],
                ingredientrecipes: [],
                loading: false,
                error: action.payload
            };
        case FETCH_RECIPES_BY_INGREDIENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_RECIPES_BY_INGREDIENTS_SUCCESS:
            return {
                ...state,
                randomrecipes: [],
                ingredientrecipes: action.payload,
                loading: false,
                error: null
            };
        case FETCH_RECIPES_BY_INGREDIENTS_FAILURE:
            return {
                ...state,
                randomrecipes: [],
                ingredientrecipes: [],
                loading: false,
                error: action.payload
            };
        case SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload,
            };
        case CLEAR_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: '',
                ingredientrecipes: [],
            };
        default:
            return state;
    }
};


const initialStateRecipeInformation = {
    recipe: null,  // Ensure recipes are directly under the main state, not nested
    loading: false,
    error: null,
};

export const RecipesInformationReducer = (state = initialStateRecipeInformation, action) => {
    switch (action.type) {
        case FETCH_RECIPES_INFORMATION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_RECIPES_INFORMATION_SUCCESS:
            return {
                ...state,
                recipe: action.payload,
                loading: false,
                error: null
            };
        case FETCH_RECIPES_INFORMATION_FAILURE:
            return {
                ...state,
                recipe: null,
                loading: false,
                error: action.payload
            };
        case RESET_RECIPE_INFORMATION:
            return initialStateRecipeInformation;
        default:
            return state;
        
    }
};

