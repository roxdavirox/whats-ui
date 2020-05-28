/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setUserData } from "../redux/actions/UserActions";
import { getNavigationByUser } from "../redux/actions/NavigationAction";
import jwtAuthService from "../services/jwtAuthService";
import localStorageService from "../services/localStorageService";
// import firebaseAuthService from "../services/firebase/firebaseAuthService";
import history from "history.js";

const checkJwtAuth = async setUserData => {
  try {
    let user = await jwtAuthService.refreshToken();
    
    if (!user) {
      history.push({ pathname: "/session/signin" });
    }
    
    setUserData(user);
    return user;    
  } catch (err) {
    console.log('[auth.jsx] checkJwtAuth error:', err);
    history.push({ pathname: "/session/signin" });
  }
};

const Auth = ({ children, setUserData, getNavigationByUser }) => {
  const authUser = localStorageService.getItem("auth_user");
  if (authUser) {
    setUserData(authUser);
  }
  
  useEffect(() => {
    checkJwtAuth(setUserData);
    getNavigationByUser();
  }, [setUserData, getNavigationByUser]);

  return <Fragment>{children}</Fragment>;
};

const mapStateToProps = state => ({
  setUserData: PropTypes.func.isRequired,
  getNavigationByUser: PropTypes.func.isRequired,
  login: state.login
});

export default connect(mapStateToProps, { setUserData, getNavigationByUser })(
  Auth
);
