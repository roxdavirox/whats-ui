import React, { Component } from "react";
import { Icon, IconButton, Hidden, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { MatxMenu, MatxToolbarMenu, MatxSearchBox } from "matx";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NotificationBar from "../SharedCompoents/NotificationBar";
import ShoppingCart from "../SharedCompoents/ShoppingCart";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.divider
  },
  brandText: {
    color: theme.palette.primary.contrastText
  },
  menuItem: {
    minWidth: 185
  }
});

class Layout2Topbar extends Component {
  state = {};

  handleSignOut = () => {};

  updateSidebarMode = sidebarSettings => {
    let { settings, setLayoutSettings } = this.props;

    setLayoutSettings({
      ...settings,
      layout2Settings: {
        ...settings.layout2Settings,
        leftSidebar: {
          ...settings.layout2Settings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  handleSidebarToggle = () => {
    let { settings } = this.props;
    let { layout2Settings } = settings;

    let mode =
      layout2Settings.leftSidebar.mode === "close" ? "mobile" : "close";

    this.updateSidebarMode({ mode });
  };

  render() {
    let { classes } = this.props;
    return (
      <div className={`topbar ${classes.root}`}>
        <div className="flex justify-between items-center container h-full">
          <div className="flex items-center brand">
            <img src="/assets/images/logo.svg" alt="company-logo" />
            <span className={`brand__text ${classes.brandText}`}>Matx</span>
          </div>
          <div className="mx-auto"></div>
          <div className="flex items-center">
            <MatxToolbarMenu offsetTop="80px">
              <MatxSearchBox />

              <NotificationBar />

              <ShoppingCart />

              <MatxMenu
                menuButton={
                  <img
                    className="mx-2 align-middle circular-image-small cursor-pointer"
                    src="/assets/images/face-7.jpg"
                    alt="user"
                  />
                }
              >
                <MenuItem className={classes.menuItem}>
                  <Icon> home </Icon>
                  <span className="pl-4"> Home </span>
                </MenuItem>
                <MenuItem className={classes.menuItem}>
                  <Icon> person </Icon>
                  <span className="pl-4"> Person </span>
                </MenuItem>
                <MenuItem className={classes.menuItem}>
                  <Icon> settings </Icon>
                  <span className="pl-4"> Settings </span>
                </MenuItem>
                <MenuItem
                  onClick={this.handleSignOut}
                  className={classes.menuItem}
                >
                  <Icon> power_settings_new </Icon>
                  <span className="pl-4"> Logout </span>
                </MenuItem>
              </MatxMenu>
            </MatxToolbarMenu>

            <Hidden mdUp>
              <IconButton onClick={this.handleSidebarToggle}>
                <Icon>menu</Icon>
              </IconButton>
            </Hidden>
          </div>
        </div>
      </div>
    );
  }
}

Layout2Topbar.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  setLayoutSettings: PropTypes.func.isRequired,
  settings: state.layout.settings
});

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, { setLayoutSettings })(Layout2Topbar)
);
