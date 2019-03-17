import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import admin from './admin';

export default combineReducers({
    auth,
    admin,
    form: formReducer
});