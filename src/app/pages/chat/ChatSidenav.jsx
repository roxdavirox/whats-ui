import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
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
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { closeContactListDialog } from '../../redux/actions/ChatActions';
import { useDebouncedCallback } from 'use-debounce';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const SearchContact = ({ onSearch, initialValue = '' }) => {
  const [searchContact, setSearchContact] = useState(initialValue);
  const dispatch = useDispatch();
  const handleCloseContactList = () => dispatch(closeContactListDialog());

  const [handleSearchDebounce] = useDebouncedCallback(
    (term) => {
      onSearch(term);
    },
    500
  );

  const handleSearch = term => {
    setSearchContact(term);
    handleSearchDebounce(term);
  }

  return (
    <div style={{ display: 'flex', height: '50px' }}>
    <Tooltip title="Voltar">
      <IconButton onClick={handleCloseContactList}>
        <ArrowBackIcon />
      </IconButton>
    </Tooltip>
    <TextField 
      label="Buscar contato"
      type="search"
      variant="standard"
      style={{ width: '100%' }}
      value={searchContact}
      onChange={e => handleSearch(e.target.value)}
      focused
    />
  </div>
  )
}

const ChatSidenav = ({
  handleContactClick,
  onOpenContactList,
  isContactListOpen
}) => {
  const currentUser = useSelector(({ user }) => user);
  const recentChats = useSelector(getRecentChats);
  const contacts = useSelector(({ chat }) => chat.contacts);

  const [searchContact, setSearchContact] = useState('');

  const filteredContacts = Object
    .values(contacts)
    .filter(contact => contact.name.toLowerCase().includes(searchContact.toLocaleLowerCase()));

  const WrapperContactList = React.forwardRef((props, ref) => (
    <div ref={ref} {...props}>
      <SearchContact onSearch={setSearchContact} initialValue={searchContact} />
      <Divider />
      <ContactList
        contacts={filteredContacts}
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
          {currentUser 
            && currentUser.name.length > 8 
              ? `${currentUser.name.substring(0, 8)} ...` : currentUser.name
          }
        </h5>
        <div style={{ width: '100%', flexDirection: 'row-reverse', display: 'flex' }}>
          <Tooltip title="Iniciar conversa">
            <IconButton onClick={onOpenContactList}>
              <ChatIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Adicionar contato">
            <IconButton onClick={onOpenContactList}>
              <PersonAddIcon />
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
        : recentChats && recentChats
          .map((chat, index) => (     
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
