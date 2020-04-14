import React from "react";
import { withStyles, ThemeProvider } from "@material-ui/core/styles";
import { Button, Toolbar, AppBar } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Footer = ({ theme, settings }) => {
  const footerTheme = settings.themes[settings.footer.theme] || theme;
  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar color="primary" position="static">
        <Toolbar className="footer flex items-center">
          <div className="flex items-center container w-full">
            {/* <a
              href="https://github.com/uilibrary/matx-react"
              target="_blank"
              className="mr-2"
            >
              <Button variant="contained">Download Free version</Button>
            </a>
            <a href="https://material-ui.com/store/items/matx-pro-react-dashboard-template/">
              <Button variant="contained" color="secondary">
                Get MatX Pro
              </Button>
            </a> */}
            <span className="m-auto"></span>
            <p className="m-0">
              Developed by <b>FutureDev</b>
            </p>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

Footer.propTypes = {
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  settings: state.layout.settings
});

export default withStyles(
  {},
  { withTheme: true }
)(connect(mapStateToProps, {})(Footer));
