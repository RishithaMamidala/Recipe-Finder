import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {LoginUserReducer, registerUserReducer} from "./Users/Reducer";
import {thunk} from 'redux-thunk';
import {RecipesReducer, RecipesInformationReducer} from "./Recipes/Reducer";
import { FavoritesReducer, favInformationReducer } from "./Favorites/Reducer";


const rootReducer = combineReducers({
    registerUser: registerUserReducer,
    loginUser: LoginUserReducer,
    recipes: RecipesReducer,
    recipeInformation: RecipesInformationReducer,
    favorites: FavoritesReducer,
    // favoritesInformation: favInformationReducer
})

//export const store=legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
export const store=legacy_createStore(rootReducer, applyMiddleware(thunk))