import axios from "axios";
import { AUTH_USER, AUTH_ERROR, ADMIN_ERROR, GET_EMPLOYEE } from "./types";
import { ROOT_URL } from "../constants";

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
export const passwordRecover = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      `${ROOT_URL}/passwordrecovery`,
      formProps
    );
    callback();
  } catch (e) {
    console.log("problem with password recovery");
  }
};

export const changePassword = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${ROOT_URL}/changepassword`, formProps);
    callback();
  } catch (e) {
    console.log("problem with changing password");
  }
};

export const getAllAwards = result => async dispatch => {
  try {
    return await axios.get(`${ROOT_URL}/getallawards`);
  } catch (e) {
    console.log("error getting all awards");
  }
};

export const getRecipients = result => async dispatch => {
  try {
    return await axios.get(`${ROOT_URL}/getemployees`);
  } catch (e) {
    console.log("error getting users");
  }
};

export const getAwards = user_id => async dispatch => {
  try {
    return await axios.get(`${ROOT_URL}/getawards`, {
      params: {
        user_id: user_id
      }
    });
  } catch (e) {
    console.log("error getting awards");
  }
};

export const getSignature = user_id => async dispatch => {
  try {
    return await axios.get(`${ROOT_URL}/getsignature`, {
      params: {
        user_id: user_id
      }
    });
  } catch (e) {
    console.log("error getting signature");
  }
};

export const getFullName = user_id => async dispatch => {
  try {
    return await axios.get(`${ROOT_URL}/getfullname`, {
      params: {
        user_id: user_id
      }
    });
  } catch (e) {
    console.log("error getting full name");
  }
};

export const changeName = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.put(`${ROOT_URL}/changename`, formProps);
    callback();
  } catch (e) {
    console.log("error changing name");
  }
};

export const deleteAwards = (award_ids, callback) => async dispatch => {
  try {
    const response = await axios.delete(`${ROOT_URL}/deleteawards`, {
      data: {
        award_ids: award_ids
      }
    });
    callback();
  } catch (e) {
    console.log("error deleting awards");
  }
};

export const createUser = (formProps, callback) => async dispatch => {
  try {
    console.log('formProps', formProps);
    const response = await axios.post(`${ROOT_URL}/signup`, formProps);
    // dispatch({});
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

export const createAward = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${ROOT_URL}/createaward`, formProps);
    callback(); // User redirected to feature page
  } catch (e) {
    console.log("error creating award");
  }
};

export const getAwardsSent = result => async dispatch => {
  try {
    console.log("here in the index.js actions", result);
    return await axios.get(`${ROOT_URL}/getawardssent`, {
      params: {
        user_id: result.recipientID
      }
    });
    //console.log("callback", callback);
    //callback();
  } catch (e) {
    console.log("error creating award");
    console.log(result);
    //dispatch({ type: GET_EMPLOYEE, payload: 'Must be a user to create award' });
  }
};

export const getAwardsReceived = result => async dispatch => {
  try {
    console.log("here in the index.js actions", result);
    return await axios.get(`${ROOT_URL}/getawardsreceived`, {
      params: {
        user_id: result.recipientID
      }
    });

    // callback();
  } catch (e) {
    console.log("error creating award");
    console.log(result);
    //dispatch({ type: GET_EMPLOYEE, payload: 'Must be a user to create award' });
  }
};
/*
export const getAwardsReceived = (formProps, callback) => async dispatch => {
  try {
    console.log("here in the index.js actions", formProps);
    const response = await axios.get(`${ROOT_URL}/getawardsreceived`, {
      params: {
        user_id: formProps.recipientID
      }
    });

    callback();
  } catch (e) {
    console.log("error creating award");
    console.log(formProps);
    //dispatch({ type: GET_EMPLOYEE, payload: 'Must be a user to create award' });
  }
};
*/
export const getAwardType = result => async dispatch => {
  try {
    console.log("here in the index.js actions", result);
    return await axios.get(`${ROOT_URL}/getawardType`, {
      params: {
        user_id: result.awardtypeID
      }
    });
    //callback();
  } catch (e) {
    console.log("error creating award");
    console.log(result);
    //dispatch({ type: GET_EMPLOYEE, payload: 'Must be a user to create award' });
  }
};
export const getAwardMonth = result => async dispatch => {
  try {
    console.log("here in the index.js actions", result);
    return await axios.get(`${ROOT_URL}/getawardMonth`, {
      params: {
        user_id: result.monthID
      }
    });
    //callback();
  } catch (e) {
    console.log("error creating award");
    console.log(result);
    //dispatch({ type: GET_EMPLOYEE, payload: 'Must be a user to create award' });
  }
};
export const getAwardRange = result => async dispatch => {
  try {
    console.log("here in the index.js actions", result);
    return await axios.get(`${ROOT_URL}/getawardrange`, {
      params: {
        award_id: result.awardtypeID,
        end: result.end,
        beginning: result.beginning
      }
    });
    //callback();
  } catch (e) {
    console.log("error creating award");
    console.log(result);
    //dispatch({ type: GET_EMPLOYEE, payload: 'Must be a user to create award' });
  }
};
export const getAwardTotal = result => async dispatch => {
  try {
    console.log("here in the index.js actions", result);
    return await axios.get(`${ROOT_URL}/getawardtotal`, {
      params: {}
    });
    //callback();
  } catch (e) {
    console.log("error creating award");
    console.log(result);
    //dispatch({ type: GET_EMPLOYEE, payload: 'Must be a user to create award' });
  }
};
export const getAwardTotalSent = result => async dispatch => {
  try {
    console.log("here in the index.js actions", result);
    return await axios.get(`${ROOT_URL}/getawardtotalsent`, {
      params: {}
    });
    //callback();
  } catch (e) {
    console.log("error creating award");
    console.log(result);
    //dispatch({ type: GET_EMPLOYEE, payload: 'Must be a user to create award' });
  }
};
export const getAwardRegion = result => async dispatch => {
  try {
    console.log("here in the index.js actions", result);
    return await axios.get(`${ROOT_URL}/getawardregion`, {
      params: {}
    });
    //callback();
  } catch (e) {
    console.log("error creating award");
    console.log(result);
    //dispatch({ type: GET_EMPLOYEE, payload: 'Must be a user to create award' });
  }
};
export const signup = (formProps, callback) => async dispatch => {
  // formProps contains { email: '', password: '' }
  try {
    const response = await axios.post(`${ROOT_URL}/signup`, formProps);
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem("token", response.data.token); // Persists user login status through localStorage
    callback(); // User redirected to feature page
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  // formProps contains { email: '', password: '' }
  try {
    const response = await axios.post(`${ROOT_URL}/signin`, formProps);
    // TODO: Send admin status from response to Redux
    console.log("response from actions", response);
    dispatch({
      type: AUTH_USER,
      payload: response.data.token,
      admin: response.data.admin,
      user_id: response.data.user["user_id"]
    });
    localStorage.setItem("token", response.data.token); // Persists user login status through localStorage
    callback(); // User redirected to feature page
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid login" });
  }
};

export const signout = () => {
  localStorage.removeItem("token");
  return {
    type: AUTH_USER,
    payload: ""
  };
};
