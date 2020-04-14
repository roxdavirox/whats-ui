import React from "react";
import ChatAvatar from "./ChatAvatar";
import Scrollbar from "react-perfect-scrollbar";
import { Divider } from "@material-ui/core";
import { format } from "date-fns";

const ChatSidenav = ({
  currentUser,
  contactList = [],
  recentContactList = [],
  handleContactClick
}) => {
  return (
    <div className="chat-sidenav bg-default">
      <div className="chat-sidenav__topbar flex items-center h-56 px-4 bg-primary">
        <ChatAvatar src={currentUser.avatar} status={currentUser.status} />
        <h5 className="ml-4 whitespace-pre mb-0 font-medium text-18 text-white">
          {currentUser.name}
        </h5>
      </div>
      <Scrollbar className="chat-contact-list position-relative h-400">
        {recentContactList.map((contact, index) => (
          <div
            onClick={() => handleContactClick(contact.id)}
            key={index}
            className="flex items-center p-4 cursor-pointer  gray-on-hover"
          >
            <ChatAvatar src={contact.avatar} status={contact.status} />
            <div className="pl-4">
              <p className="m-0">{contact.name}</p>
              <p className="m-0 text-muted">
                {format(
                  new Date(contact.lastChatTime).getTime(),
                  "MMMM dd, yyyy"
                )}
              </p>
            </div>
          </div>
        ))}
        <Divider />
        {contactList.map((contact, index) => (
          <div
            onClick={() => handleContactClick(contact.id)}
            key={index}
            className="flex items-center px-4 py-1 cursor-pointer  gray-on-hover"
          >
            <ChatAvatar src={contact.avatar} status={contact.status} />
            <div className="pl-4">
              <p>{contact.name}</p>
            </div>
          </div>
        ))}
      </Scrollbar>
    </div>
  );
};

export default ChatSidenav;
