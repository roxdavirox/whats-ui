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
import useAudio from 'app/components/customHooks/Audio';

const AppChat = props => {
  const [playing, toggle] = useAudio('https://whatspipe.blob.core.windows.net/audios/whats-notification.mp3');
  const dispatch = useDispatch();
  const [chatSocket, setClient] = useState({});
  const contacts = useSelector(({ chat }) => chat.contacts);
  const recentChats = useSelector(({ chat }) => chat.recentChats);
  const transferUsers = useSelector(({ chat }) => chat.transferUsers)
  const fetchedMessages = useSelector(({ chat }) => chat.fetchedMessages);
  const currentContact = useSelector(({ chat: chatState }) => chatState.contacts[chatState.contactId] || {});

  let reference = useRef();
  const [_reference, setReference] = useState(reference);

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

  const setRef = ref => {
    reference = ref;
    setReference(ref);
  };

  const handleReceivedMessage = message => {
    console.log('mensagem recebida:', message);
    if (!message.message) return;
    dispatch(addMessage(message));
    if (!reference || !reference.current) return;
    reference.current.scrollTop = 99999999;
    if (message.key.fromMe) return;
    toggle();
  }

  const handleReceiveContactMessages = ({ messages, contactId }) => {
    if (!messages.length) return;
    dispatch(setMessages(messages, contactId));
    dispatch(setFetchedMessage(contactId));
    if (!reference || !reference.current) return;
    reference.current.scrollTop = 99999999;
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
    reference.current.scrollTop = 999999999;
    setReference(reference);
    // handleCloseContactList();
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
  console.log('ref', reference);
  
  return (
    <div className="m-sm-30" style={{ height: '72vh', minHeight: '72vh' }}>
      {/* <div className="mb-sm-30">
        <Breadcrumb routeSegments={[{ name: "Chat" }]} />
      </div> */}
      <Card elevation={6} style={{ width: '100%', height: '100%' }}>
        <MatxSidenavContainer>
          <MatxSidenav
            width="260px"
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
              parentScrollRef={_reference}
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
