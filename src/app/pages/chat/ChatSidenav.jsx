import React from "react";
import { useSelector } from 'react-redux';
import ChatAvatar from "./ChatAvatar";
import Scrollbar from "react-perfect-scrollbar";
import { format } from "date-fns";
import ChatIcon from '@material-ui/icons/Chat';
import {
  IconButton,
  Tooltip
} from "@material-ui/core";
import Drawer from '@material-ui/core/Drawer';
import ContactList from './ContactList';
import { getRecentChats } from '../../redux/selectors/ChatSelectors';

const ChatSidenav = ({
  contactList = [],
  handleContactClick,
  handleOpenContactList,
  handleCloseContactList,
  openContactList
}) => {
  const currentUser = useSelector(({ user }) => user);
  const recentChats = useSelector(getRecentChats);
  console.log('currentUser', currentUser);
  return (
    <div className="chat-sidenav bg-default" style={{ height: '66vh' }}>
      <div className="chat-sidenav__topbar flex items-center h-56 px-4 bg-primary">
        <Drawer anchor="left" open={openContactList}>
          <ContactList 
            contacts={contactList}
            onClose={handleCloseContactList}
            handleContactClick={handleContactClick} />
        </Drawer>
        {currentUser 
          && <ChatAvatar status={'online'} />}
        <h5 className="ml-4 whitespace-pre mb-0 font-medium text-18 text-white">
          {currentUser && currentUser.name}
        </h5>
        <div style={{ width: '100%', flexDirection: 'row-reverse', display: 'flex' }}>
          <Tooltip title="Iniciar conversa">
            <IconButton onClick={handleOpenContactList}>
              <ChatIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <Scrollbar className="chat-contact-list position-relative h-700" style={{ height: '100%' }}>
        {recentChats && recentChats.map((chat, index) => (     
          <div key={index}>
            {chat && chat.contact &&
            <div
              onClick={() => handleContactClick(chat.contact.id)}
              key={index}
              className="flex items-center p-4 cursor-pointer  gray-on-hover"
            >
              <ChatAvatar status={'online'} />
              <div className="pl-4">
                <p className="m-0">{chat.contact.name}</p>
                <p className="m-0 text-muted">
                  {new Date(chat.lastMessageTime)
                    .toLocaleString(
                        'pt-BR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                  })}
                </p>
              </div>
            </div>}
          </div>
        ))}
      </Scrollbar>
    </div>
  );
};

export default ChatSidenav;
