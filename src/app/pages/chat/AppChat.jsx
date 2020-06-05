import React, { useEffect, useState, memo, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Card } from "@material-ui/core";
import {
  Breadcrumb,
  MatxSidenavContainer,
  MatxSidenav,
  MatxSidenavContent
} from "matx";
import ChatSidenav from "./ChatSidenav";
import ChatContainer from "./ChatContainer";
import { isMobile } from "utils";
import TransferListDialog from './TransferListDialog';
import SaveContactDialog from './SaveContactDialog';
import { 
  setTransferUsers, 
  setRecentChats, 
  setContacts,
  addMessage,
  closeContactListDialog,
  openSaveContactDialog,
  closeSaveContactDialog,
  openTransferListDialog,
  closeTransferListDialog,
  setFetchedMessage,
  setContactId,
  setCurrentChatRoom,
  setMessages,
  saveContact,
  transferContact,
  setReceivedContact
 } from '../../redux/actions/ChatActions';
import socket from './socket';

const AppChat = props => {
  const dispatch = useDispatch();
  const [chatSocket, setClient] = useState({});
  const contacts = useSelector(({ chat }) => chat.contacts);
  const recentChats = useSelector(({ chat }) => chat.recentChats);
  const transferUsers = useSelector(({ chat }) => chat.transferUsers)
  const fetchedMessages = useSelector(({ chat }) => chat.fetchedMessages);
  const currentContact = useSelector(({ chat: chatState }) => chatState.contacts[chatState.contactId] || {});

  let reference = useRef();

  useEffect(() => {
    let chatSocket = socket();

    chatSocket.registerChatHandler(handleReceiveChats);
    chatSocket.registerContactsHandler(handleReceiveContacts);
    chatSocket.registerMessageHandler(handleReceivedMessage);
    chatSocket.registerTransferUsers(handleReceiveTransferUsers);
    chatSocket.registerTransferContact(handleReceiveContact);
    chatSocket.registerReceiveContactMessages(handleReceiveContactMessages);
    setClient(chatSocket);
    return () => {
      chatSocket.disconnect();
      clearChat();
    }
  }, []);
  
  const clearChat = () => {
    dispatch(setCurrentChatRoom(''));
    dispatch(setContactId(''));
  }

  const handleReceiveTransferUsers = transferUsers => dispatch(setTransferUsers(transferUsers));

  const handleReceiveChats = chats => dispatch(setRecentChats(chats));

  const handleReceiveContacts = contacts => {
    console.log('contacts', contacts);
    const contactsObject = contacts.reduce((obj, contact) => ({
      ...obj,
      [contact.id]: { ...contact, status: 'Online',  chat: { messages: [] } }
    }), {});
    dispatch(setContacts(contactsObject));
  }

  const setRef = ref => reference = ref;

  const handleReceivedMessage = message => {
    console.log('mensagem recebida:', message);
    if (!message.message.conversation) return;
    dispatch(addMessage(message));
    if (!reference || !reference.current) return;
    reference.current.scrollTop = 99999999;
  }

  const handleReceiveContactMessages = ({ messages, contactId }) => {
    if (!messages.length) return;
    dispatch(setMessages(messages, contactId));
    dispatch(setFetchedMessage(contactId));
  }

  const handleContactClick = contactId => {
    // if (isMobile()) toggleSidenav();
    
    const messageStatus = fetchedMessages[contactId] || { fetched: false };
    console.log('messageStatus', messageStatus);
    if (!messageStatus.fetched) {
      chatSocket.requestContactMessages(contactId);
    }
    dispatch(setContactId(contactId));
    dispatch(setCurrentChatRoom(1));
    if (!reference || !reference.current) return;
    reference.current.scrollTop = 99999999;
    handleCloseContactList();
  };

  const handleMessageSend = message => {
    const chat = recentChats.find(c => c.contactId === currentContact.id);
    if(!chat) return;
    const newMsg = {
      contactId: currentContact.id,
      jid: currentContact.jid,
      text: message,
      time: new Date(),
      chatId: chat.id
    };
    console.log('mensagem enviada', newMsg);
    chatSocket.sendMessage(newMsg);
  };
  
  const handleOpenTransferList = () => dispatch(openTransferListDialog());
  const handleCloseTransferList = () => dispatch(closeTransferListDialog());
  const handleSelectTransferContact = (selectedUserId) => {
    dispatch(transferContact(selectedUserId, chatSocket));
    clearChat();
  }

  const handleReceiveContact = ({ chat, contact }) => {
    if (!contact || !chat) return;
    dispatch(setReceivedContact(chat, contact));
  }

  const handleSaveContact = contactName => {
    if (!contactName) return;
    dispatch(saveContact(contactName, chatSocket));
  }

  const handleCloseContactList = () => dispatch(closeContactListDialog());
  const handleOpenSaveContact = () => dispatch(openSaveContactDialog());
  const handleCloseSaveContact = () => dispatch(closeSaveContactDialog());

  const openContactList = useSelector(({ chat }) => chat.openContactList);
  const openTransferList = useSelector(({ chat }) => chat.openTransferList);
  const openSaveContact = useSelector(({ chat }) => chat.openSaveContact);
  const currentChatRoom = useSelector(({ chat }) => chat.currentChatRoom);
  
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb routeSegments={[{ name: "Chat" }]} />
      </div>
      <Card elevation={6}>
        <MatxSidenavContainer>
          <MatxSidenav
            width="230px"
            open
            // toggleSidenav={toggleSidenav}
          >
            <ChatSidenav
              openContactList={openContactList}
              contactList={contacts}
              handleContactClick={handleContactClick}
              handleCloseContactList={handleCloseContactList}
            />
          </MatxSidenav>
          {openTransferList && 
            <TransferListDialog 
                users={transferUsers}
                onSelect={handleSelectTransferContact}
                open={openTransferList}
                onClose={handleCloseTransferList} 
              />
          }
          {openSaveContact && 
            <SaveContactDialog 
                open={openSaveContact}
                onSave={handleSaveContact}
                onClose={handleCloseSaveContact}
              />
          }
          <MatxSidenavContent>
            <ChatContainer
              handleOpenTransferList={handleOpenTransferList}
              onSaveDialogOpen={handleOpenSaveContact}
              currentChatRoom={currentChatRoom}
              setRef={setRef}
              handleMessageSend={handleMessageSend}
              // toggleSidenav={toggleSidenav}
            />
          </MatxSidenavContent>
        </MatxSidenavContainer>
      </Card>
    </div>
  );
}


export default memo(AppChat);
