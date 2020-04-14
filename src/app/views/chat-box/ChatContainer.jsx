import React, { Fragment } from "react";
import {
  IconButton,
  Icon,
  Divider,
  Fab,
  TextField,
  MenuItem
} from "@material-ui/core";
import { MatxMenu } from "matx";
import Scrollbar from "react-perfect-scrollbar";
import EmptyMessage from "./EmptyMessage";
import ChatAvatar from "./ChatAvatar";
import { getTimeDifference } from "utils";
import shortid from "shortid";

const ChatContainer = ({
  id: currentUserId,
  toggleSidenav,
  currentChatRoom,
  opponentUser,
  messageList = [],
  setBottomRef,
  handleMessageSend
}) => {
  let [message, setMessage] = React.useState("");
  const sendMessageOnEnter = event => {
    if (event.key === "Enter" && !event.shiftKey) {
      message = message.trim();
      if (message !== "") handleMessageSend(message);
      setMessage("");
    }
  };

  return (
    <div className="chat-container flex-column position-relative">
      <div className="chat-container__topbar flex items-center justify-between p-1 bg-primary">
        <div className="flex items-center">
          <div className="show-on-mobile">
            <IconButton onClick={toggleSidenav}>
              <Icon className="text-white">short_text</Icon>
            </IconButton>
          </div>

          <div className="hide-on-mobile">
            <div className="pl-3"></div>
          </div>

          {opponentUser && (
            <Fragment>
              <ChatAvatar
                src={opponentUser.avatar}
                status={opponentUser.status}
              />
              <h5 className="ml-4 whitespace-pre mb-0 font-medium text-18 text-white">
                {opponentUser.name}
              </h5>
            </Fragment>
          )}
        </div>
        <MatxMenu
          menuButton={
            <IconButton>
              <Icon className="text-white">more_vert</Icon>
            </IconButton>
          }
        >
          <MenuItem className="flex items-center">
            <Icon className="mr-4">account_circle</Icon> Contact
          </MenuItem>
          <MenuItem className="flex items-center">
            <Icon className="mr-4">volume_mute</Icon> Mute
          </MenuItem>
          <MenuItem className="flex items-center">
            <Icon className="mr-4">delete</Icon> Clear Chat
          </MenuItem>
        </MatxMenu>
      </div>

      <Scrollbar
        containerRef={ref => {
          setBottomRef(ref);
        }}
        className="chat-message-list flex-grow position-relative"
      >
        {currentChatRoom === "" && (
          <div className="flex-column justify-center items-center h-full">
            <EmptyMessage />
            <p>Select a contact</p>
          </div>
        )}
        {messageList.map((message, index) => (
          <div className="flex items-start px-4 py-3" key={shortid.generate()}>
            <ChatAvatar src={message.avatar} status={message.status} />
            <div className="ml-4">
              <p className="text-muted m-0 mb-2">{message.name}</p>
              <div
                className={`px-4 py-2 mb-2 list__message ${
                  currentUserId === message.contactId
                    ? "bg-primary text-white"
                    : "bg-paper"
                }`}
              >
                <span className="whitespace-pre-wrap">{message.text}</span>
              </div>
              <small className="text-muted mb-0">
                {getTimeDifference(new Date(message.time))} ago
              </small>
            </div>
          </div>
        ))}
        {/* <div ref={ref => setBottomRef(ref)} /> */}
      </Scrollbar>

      <Divider />

      {currentChatRoom !== "" && (
        <div className="flex items-center px-4 py-2">
          <TextField
            label="Type your message here*"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={sendMessageOnEnter}
            fullWidth
            multiline={true}
            rows={1}
            variant="outlined"
          />
          <div>
            <Fab
              onClick={() => {
                if (message.trim() !== "") handleMessageSend(message);
                setMessage("");
              }}
              color="primary"
              className="ml-4"
            >
              <Icon>send</Icon>
            </Fab>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
