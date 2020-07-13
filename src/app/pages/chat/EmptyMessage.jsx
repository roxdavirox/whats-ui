import React from "react";
import { Icon } from "@material-ui/core";

const EmptyMessage = () => {
  return (
    <div className="flex-column justify-center items-center h-full">
      <div className="empty-message-circle bg-default flex justify-center items-center">
        <Icon color="primary">chat</Icon>
      </div>
      <p>Selecione uma conversa</p>
    </div>
  );
};

export default EmptyMessage;
