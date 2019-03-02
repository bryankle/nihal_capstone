import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, GET_EMPLOYEE, ADMIN_ERROR } from './types';
import { ROOT_URL } from '../constants';

export const getEmployee = (callback) => async dispatch => {
    console.log('getEmployee running from actions');
    try {
        const response = await axios.get(`${ROOT_URL}/employee`);
        console.log('response', response);
        dispatch({ type: GET_EMPLOYEE, users: response.data });
    }
    catch(e) {
        dispatch({ type: ADMIN_ERROR, payload: 'Unable to retrieve users' });
    }
}

export const createUser = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post(`${ROOT_URL}/signup`, formProps);
        // dispatch({});
        callback();
    }
    catch(e) {
        dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
    }
}

export const signup = (formProps, callback) => async dispatch => {
    // formProps contains { email: '', password: '' }
    try {
        const response = await axios.post(`${ROOT_URL}/signup`, formProps);
        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token); // Persists user login status through localStorage
        callback(); // User redirected to feature page
    } catch(e) {
        dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
    }
};

export const signin = (formProps, callback) => async dispatch => {
    // formProps contains { email: '', password: '' }
    try {
        const response = await axios.post(`${ROOT_URL}/signin`, formProps);
        // TODO: Send admin status from response to Redux
        console.log('response from actions', response);
        dispatch({ type: AUTH_USER, payload: response.data.token, admin: response.data.admin });
        localStorage.setItem('token', response.data.token); // Persists user login status through localStorage
        callback(); // User redirected to feature page
    } catch(e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login' });
    }
};

export const signout = () => {
    localStorage.removeItem('token');
    return {
        type: AUTH_USER,
        payload: ''
    }
};