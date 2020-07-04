import React, { useEffect, useState, memo, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Card } from "@material-ui/core";
import {
  MatxSidenavContainer,
  MatxSidenav,
  MatxSidenavContent
} from "matx";
import ChatSidenav from "./ChatSidenav";
import ChatContainer from "./ChatContainer";
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
  setReceivedContact,
  getMessagesByContactId
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
    dispatch(setContacts(contacts));
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
    reference.current.scrollTop = 999999;
  }

  const handleContactClick = contactId => {
    dispatch(setContactId(contactId));
    dispatch(setCurrentChatRoom(1));
    dispatch(getMessagesByContactId(contactId));
    if (!reference || !reference.current) return;
    reference.current.scrollTop = 999999;
    setReference(reference);
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
    <div className="m-sm-30" style={{ height: '72vh', minHeight: '72vh' }}>
      <Card elevation={6} style={{ width: '100%', height: '100%' }}>
        <MatxSidenavContainer>
          <MatxSidenav
            width="260px"
            open
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
            />
          </MatxSidenavContent>
        </MatxSidenavContainer>
      </Card>
    </div>
  );
}


export default memo(AppChat);
