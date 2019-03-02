import { AUTH_USER, AUTH_ERROR, GET_EMPLOYEE } from '../actions/types';
const INITIAL_STATE = {
    users: []
};

export default function(state = INITIAL_STATE, action) {
    console.log('reducers admin actions', action);
    switch(action.type) {
        case GET_EMPLOYEE:
            return { ...state, users: [...action.users], hello: 'world' };
        default:
            return state;
    }
};