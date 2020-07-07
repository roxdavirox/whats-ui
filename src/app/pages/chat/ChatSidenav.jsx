import React from "react";
import { useSelector } from 'react-redux';
import ChatAvatar from "./ChatAvatar";
import Scrollbar from "react-perfect-scrollbar";
import ChatIcon from '@material-ui/icons/Chat';
import {
  IconButton,
  Tooltip
} from "@material-ui/core";
import Slide from '@material-ui/core/Slide';
import ContactList from './ContactList';
import { getRecentChats } from '../../redux/selectors/ChatSelectors';

const ChatSidenav = ({
  handleContactClick,
  onOpenContactList,
  isContactListOpen
}) => {
  const currentUser = useSelector(({ user }) => user);
  const recentChats = useSelector(getRecentChats);
  const contacts = useSelector(({ chat }) => chat.contacts);

  const WrapperContactList = React.forwardRef((props, ref) => (
    <div ref={ref} {...props}>
      <ContactList
        contacts={contacts}
        handleContactClick={handleContactClick}
      />
    </div>
  ));

  return (
    <div className="chat-sidenav bg-default" style={{ height: '66vh' }}>
      <div className="chat-sidenav__topbar flex items-center h-56 px-4 bg-primary">
        {currentUser 
          && <ChatAvatar status={'online'} />}
        <h5 className="ml-4 whitespace-pre mb-0 font-medium text-18 text-white">
          {currentUser && currentUser.name}
        </h5>
        <div style={{ width: '100%', flexDirection: 'row-reverse', display: 'flex' }}>
          <Tooltip title="Iniciar conversa">
            <IconButton onClick={onOpenContactList}>
              <ChatIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <Scrollbar className="chat-contact-list position-relative h-700" style={{ height: '100%' }}>
        {isContactListOpen 
          ? <Slide
              direction="right"
              in={isContactListOpen}
              mountOnEnter unmountOnExit
            >
              <WrapperContactList />
          </Slide>
        : recentChats && recentChats.map((chat, index) => (     
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
