import api from '../../services/api';
import { setUserData } from "./UserActions";
import history from "history.js";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const RESET_PASSWORD = "RESET_PASSWORD";

export function resetPassword({ email }) {
  return dispatch => {
    dispatch({
      payload: email,
      type: RESET_PASSWORD
    });
  };
}

export function makeLogin(email, password) {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });
    const url = 'auth/authenticate';
    api.post(url , { email, password })
      .then(({ data }) => {
        if (data.auth) {
          console.log('data', data);
          dispatch(setUserData({ ...data.user }));

          history.push({
            pathname: "/chat"
          });

          console.log('make login success');
          return dispatch({
            type: LOGIN_SUCCESS
          });
        } else {
          return dispatch({
            type: LOGIN_ERROR,
            payload: "Login Failed"
          });
        }
      })
      .catch(error => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      });
  };
}
