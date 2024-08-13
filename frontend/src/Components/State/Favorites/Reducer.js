import { FETCH_FAVORITES_REQUEST,
    FETCH_FAVORITES_FAILURE,
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

const initialState = {
    favorites: [],  // Ensure recipes are directly under the main state, not nested
    loading: false,
    error: null,
    recipes: []
};

export const FavoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FAVORITES_REQUEST:
        case ADD_FAVORITES_REQUEST:
        case REMOVE_FAVORITES_REQUEST:
        case FETCH_FAV_RECIPES_INFORMATION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_FAVORITES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                favorites: action.payload
            };
        case ADD_FAVORITES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                favorites: [...state.favorites, action.payload] // Assuming action.payload is the new favorite added
            };
        case REMOVE_FAVORITES_SUCCESS:
            const removedRecipeId = action.payload.recipe_id.toString();
            return {
                ...state,
                loading: false,
                error: null,
                favorites: state.favorites.filter(favorite => favorite.recipe_id !== removedRecipeId), // Assuming action.payload is the removed favorite
                recipes: state.recipes.filter(recipe => recipe.id !== removedRecipeId)
            };
        case FETCH_FAV_RECIPES_INFORMATION_SUCCESS:
            return {
                ...state,
                // recipes: [...state.recipes, ...action.payload],
                recipes: action.payload,
                loading: false,
                error: null,
            }
        case FETCH_FAVORITES_FAILURE:
        case ADD_FAVORITES_FAILURE:
        case REMOVE_FAVORITES_FAILURE:
        case FETCH_FAV_RECIPES_INFORMATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

// const initialStateInfo = {
//     recipes: [], // Object where keys are recipe_ids and values are recipe objects
//     loading: false,
//     error: null,
// };

// export const favInformationReducer = (state = initialStateInfo, action) => {
//     switch (action.type) {
//         case FETCH_FAV_RECIPES_INFORMATION_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 error: null,
//             };
//         case FETCH_FAV_RECIPES_INFORMATION_SUCCESS:
//             return {
//                 ...state,
//                 // recipes: [...state.recipes, ...action.payload],
//                 recipes: action.payload,
//                 loading: false,
//                 error: null,
//             };
//         case FETCH_FAV_RECIPES_INFORMATION_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//             };
//         default:
//             return state;
//     }
// };

