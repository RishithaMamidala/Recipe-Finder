import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    RESET_REGISTER_USER,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    RESET_LOGIN_USER,
    CLEANUP_LOGIN_USER,
    SIGNOUT_USER
} from './ActionType'; // Import your action types

const initialStateRegister = {
    loading: false,
    success: false,
    error: null
};

export const registerUserReducer = (state = initialStateRegister, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null
            };
        case REGISTER_USER_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            };
        case RESET_REGISTER_USER:
            return initialStateRegister;
        default:
            return state;
    }
};

const initialStateLogin = {
    loading: false,
    success: false,
    error: null,
    isLoggedIn: false,
    name: '',
    token:'',
};

export const LoginUserReducer = (state = initialStateLogin, action) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                isLoggedIn: true,
                name: action.payload.name,
                token: action.payload.token
            };
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
                isLoggedIn: false,
                name: '',
                token: ''
            };
        case CLEANUP_LOGIN_USER:
            return {
                ...state,
                error: null
            };
        case SIGNOUT_USER:
            return initialStateLogin;
        default:
            return state;
    }
};
