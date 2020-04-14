import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = () => ({
  root: {
    width: "32px",
    height: "6px",
    borderRadius: "6px",
    overflow: "hidden",
    marginRight: "8px"
  }
});

const ScrumBoardLabelBar = ({ color = "primary", classes }) => {
  return <div className={`bg-${color} ${classes.root}`}></div>;
};

export default withStyles(styles, {})(ScrumBoardLabelBar);
