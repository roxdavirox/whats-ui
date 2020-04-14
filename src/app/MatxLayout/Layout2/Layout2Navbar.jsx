import React, { Component } from "react";
import { MatxHorizontalNav } from "matx";
import { navigations } from "../../navigations";
import { withStyles } from "@material-ui/core/styles"
import PropTypes from "prop-types";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    "&, & .horizontal-nav ul ul": {
      background: theme.palette.primary.main
    },
    "& .horizontal-nav a, & .horizontal-nav label": {
      color: theme.palette.primary.contrastText
    },
    "& .horizontal-nav ul li ul li:hover, & .horizontal-nav ul li ul li.open": {
      background: theme.palette.primary.dark
    }
  }
});

class Layout2Navbar extends Component {
  state = {};
  render() {
    let { classes } = this.props;

    return (
      <div className={`navbar ${classes.root}`}>
        <div className="container">
          <MatxHorizontalNav navigation={navigations} max={6} />
        </div>
      </div>
    );
  }
}

Layout2Navbar.propTypes = {
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  settings: state.layout.settings
});

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, {})(Layout2Navbar)
);
