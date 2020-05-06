import React from "react";
import ChatAvatar from "./ChatAvatar";
import Scrollbar from "react-perfect-scrollbar";
import { Divider } from "@material-ui/core";
import { format } from "date-fns";
import ChatIcon from '@material-ui/icons/Chat';
import {
  IconButton,
  Tooltip
} from "@material-ui/core";
import Drawer from '@material-ui/core/Drawer';
import ContactList from './ContactList';

const ChatSidenav = ({
  currentUser,
  contactList = [],
  recentContactList = [],
  handleContactClick,
  handleOpenContactList,
  handleCloseContactList,
  openContactList
}) => {

  return (
    <div className="chat-sidenav bg-default">
      <div className="chat-sidenav__topbar flex items-center h-56 px-4 bg-primary">
        <Drawer anchor="left" open={openContactList}>
          <ContactList 
            contacts={contactList}
            onClose={handleCloseContactList}
            handleContactClick={handleContactClick} />
        </Drawer>
        <ChatAvatar src={currentUser.eurl || currentUser.avatar} status={currentUser.status} />
        <h5 className="ml-4 whitespace-pre mb-0 font-medium text-18 text-white">
          {currentUser.name}
        </h5>
        <div style={{ width: '100%', flexDirection: 'row-reverse', display: 'flex' }}>
          <Tooltip title="Iniciar conversa">
            <IconButton onClick={handleOpenContactList}>
              <ChatIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <Scrollbar className="chat-contact-list position-relative h-700">
        {recentContactList.map((contact, index) => (
          <div
            onClick={() => handleContactClick(contact.jid)}
            key={index}
            className="flex items-center p-4 cursor-pointer  gray-on-hover"
          >
            <ChatAvatar src={contact.eurl || contact.avatar} status={contact.status} />
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
      </Scrollbar>
    </div>
  );
};

export default ChatSidenav;
