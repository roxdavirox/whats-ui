import React, { Fragment, useContext } from "react";

import { ThemeProvider } from "@material-ui/core/styles";
import { Hidden } from "@material-ui/core";
import AppContext from "app/appContext";
import Footer from "../SharedCompoents/Footer";
import Layout2Navbar from "./Layout2Navbar";
import Layout2Sidenav from "./Layout2Sidenav";
import Layout2Topbar from "./Layout2Topbar";
import PropTypes from "prop-types";
import Scrollbar from "react-perfect-scrollbar";
import SecondarySidebar from "../SharedCompoents/SecondarySidebar/SecondarySidebar";
import { classList } from "utils";
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { withStyles } from "@material-ui/styles";

const styles = theme => {
  return {
    layout: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary
    }
  };
};

const Layout2 = props => {
  const { routes } = useContext(AppContext);

  // const updateSidebarMode = sidebarSettings => {
  //   let { settings, setLayoutSettings } = props;
  //   setLayoutSettings({
  //     ...settings,
  //     layout2Settings: {
  //       ...settings.layout2Settings,
  //       leftSidebar: {
  //         ...settings.layout2Settings.leftSidebar,
  //         ...sidebarSettings
  //       }
  //     }
  //   });
  // };

  let { settings, classes, theme } = props;
  let { layout2Settings } = settings;
  let topbarTheme = settings.themes[layout2Settings.topbar.theme];
  let navbarTheme = settings.themes[layout2Settings.navbar.theme];

  let layoutClasses = {
    [classes.layout]: true,
    [settings.activeLayout]: true,
    [`sidenav-${layout2Settings.leftSidebar.mode}`]: true,
    [`layout-${layout2Settings.mode} theme-${theme.palette.type}`]: true
  };

  return (
    <Fragment>
      <div className={classList(layoutClasses)}>
        {layout2Settings.topbar.show && (
          <ThemeProvider theme={topbarTheme}>
            <Layout2Topbar />
          </ThemeProvider>
        )}

        <Hidden smDown>
          {layout2Settings.navbar.show && (
            <ThemeProvider theme={navbarTheme}>
              <Layout2Navbar />
            </ThemeProvider>
          )}
        </Hidden>

        <Hidden mdUp>
          {layout2Settings.leftSidebar.show && <Layout2Sidenav />}
        </Hidden>

        {settings.perfectScrollbar && (
          <Scrollbar
            options={{ suppressScrollX: true }}
            className="scrollable-content p-0"
          >
            <div className="container p-0">{renderRoutes(routes)}</div>
            <div className="my-auto"></div>
            {settings.footer.show && !settings.footer.fixed && <Footer />}
          </Scrollbar>
        )}

        {!settings.perfectScrollbar && (
          <div
            options={{ suppressScrollX: true }}
            className="scrollable-content p-0"
          >
            <div className="container p-0">{renderRoutes(routes)}</div>
            <div className="my-auto"></div>
            {settings.footer.show && !settings.footer.fixed && <Footer />}
          </div>
        )}

        {settings.footer.show && settings.footer.fixed && <Footer />}
      </div>
      {settings.secondarySidebar.show && <SecondarySidebar />}
    </Fragment>
  );
};

Layout2.propTypes = {
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  setLayoutSettings: PropTypes.func.isRequired,
  settings: state.layout.settings
});

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, { setLayoutSettings })(Layout2)
);
