import React, { Fragment, useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppContext from "app/appContext";

const redirectRoute = props => {
  const { location, history } = props;
  const { pathname } = location;

  history.push({
    pathname: "/session/signin",
    state: { redirectUrl: pathname }
  });
};

const getAuthStatus = (props, routes) => {
  const { location, user } = props;
  const { pathname } = location;
  const currentRoute = routes.find(r => r.path === pathname);
  console.log('user.role', user.role);
  console.log('currentRoute', currentRoute);
  const authenticated =
    currentRoute && currentRoute.auth && currentRoute.auth.length
      ? currentRoute.auth.includes(user.role)
      : true;
  return authenticated;
};

const AuthGuard = ({ children, ...props }) => {
  const { routes } = useContext(AppContext);

  let [authenticated, setAuthenticated] = useState(
    getAuthStatus(props, routes)
  );

  useEffect(() => {
    if (!authenticated) {
      redirectRoute(props);
    }
    setAuthenticated(getAuthStatus(props, routes));
  }, [setAuthenticated, authenticated, routes, props]);

  return authenticated ? <Fragment>{children}</Fragment> : null;
};

const mapStateToProps = state => ({
  user: state.user
});

export default withRouter(connect(mapStateToProps)(AuthGuard));
