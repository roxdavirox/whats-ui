import React from "react";
import { Icon } from "@material-ui/core";

const EmptyMessage = () => {
  return (
    <div className="empty-message-circle bg-default flex justify-center items-center">
      <Icon color="primary">chat</Icon>
    </div>
  );
};

export default EmptyMessage;
