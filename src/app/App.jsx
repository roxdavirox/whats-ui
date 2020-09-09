import "../fake-db";
import "../styles/_app.scss";
import "video-react/dist/video-react.css"; // import css

/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import MatxTheme from "./MatxLayout/MatxTheme/MatxTheme";
import AppContext from "./appContext";
import history from "history.js";

import routes from "./RootRoutes";
import { Store } from "./redux/Store";
import Auth from "./auth/Auth";
import MatxLayout from "./MatxLayout/MatxLayoutSFC";
import AuthGuard from "./auth/AuthGuard";
import { SnackbarProvider } from 'notistack';

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <AppContext.Provider value={{ routes }}>
        <Provider store={Store}>
          <MatxTheme>
            <Auth>
              <Router history={history}>
                <AuthGuard>
                  <MatxLayout />
                </AuthGuard>
              </Router>
            </Auth>
          </MatxTheme>
        </Provider>
      </AppContext.Provider>
    </SnackbarProvider>
  );
};

export default App;
