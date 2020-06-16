import { setUserData } from "./UserActions";
import { getNavigationByUser } from './NavigationAction';
import history from "history.js";
import jwtAuthService from '../../services/jwtAuthService';
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
    jwtAuthService
      .loginWithEmailAndPassword(email, password)
      .then(user => {
        if (user) {
          console.log('user', user);
          dispatch(setUserData(user));
          dispatch(getNavigationByUser());
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
