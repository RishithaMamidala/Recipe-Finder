import axios from 'axios';
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
} from './ActionType'; 
import { API_URL } from '../../../Config/api'; 

export const registerUser = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_USER_REQUEST }); 
    try {
        const { data } = await axios.post(`${API_URL}/api/register/`, userData);
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    } catch (error) {
        // console.log(error.response.data.error);
        dispatch({ type: REGISTER_USER_FAILURE, payload: error.response.data.error });
    }
};

export const resetRegisterUser = () => ({
    type: RESET_REGISTER_USER
});

export const loginUser = (userData) => async (dispatch) => {
    dispatch({ type: LOGIN_USER_REQUEST }); 
    try {
        const { data } = await axios.post(`${API_URL}/api/login/`, userData);
        // console.log(data)
        dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
    } catch (error) {
        // console.log(error.response.data.error);
        dispatch({ type: LOGIN_USER_FAILURE, payload: error.response.data.error });
    }
};

export const resetLoginUser = () => ({
    type: RESET_LOGIN_USER
});

export const cleanupLoginUser = () => ({
    type: CLEANUP_LOGIN_USER
});

export const signOutUser = () => async (dispatch) => {
    try {
        // Clear any server-side authentication tokens or cookies
        await axios.post(`${API_URL}/api/logout/`);
        dispatch({ type: SIGNOUT_USER });
    } catch (error) {
        // Handle any errors
        dispatch({ type: LOGIN_USER_FAILURE, payload: error.message });
    }
};