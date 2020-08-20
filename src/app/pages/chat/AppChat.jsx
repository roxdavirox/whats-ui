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
  closeTransferListDialog,
  setCurrentChatRoom,
  readChat,
  getProfilePicture
} from '../../redux/actions/ChatActions';
import { 
  openSaveContactDialog,
  closeSaveContactDialog,
  setContactId,
  setContacts,
  saveContact,
  setReceivedContact,
  openContactList,
  transferContact,
  setActiveContact
} from '../../redux/actions/ContactActions';
import { addMessage, loadFirstMessages } from '../../redux/actions/MessageActions';
import { selectCurrentContact, } from '../../redux/selectors/ContactSelectors';
import socket from './socket';
import useAudio from 'app/components/customHooks/Audio';
import AddContactDialog from "./AddContactDialog";
import { selectRecentChats } from "app/redux/selectors/ChatSelectors";

const audioUrl = 'https://whatspipe.blob.core.windows.net/audios/Data-Beep-Notifier-Thumb%20Pluck-Double.mp3';
const transferNotification = 'https://whatspipe.blob.core.windows.net/audios/Ambient_Game_Bubble_UI_1.mp3';
const receiveContactNotification = 'https://whatspipe.blob.core.windows.net/audios/Vibrant_Game__Correct_Answer_Hit.mp3';

const AppChat = props => {
  const [, toggle] = useAudio(audioUrl);
  const [, transferNotify] = useAudio(transferNotification);
  const [, notifyReceiveContact] = useAudio(receiveContactNotification);

  const dispatch = useDispatch();
  const [chatSocket, setClient] = useState({});
  const recentChats = useSelector(selectRecentChats);
  const currentContact = useSelector(selectCurrentContact);

  let reference = useRef();
  const [_reference, setReference] = useState(reference);
  const qrcodeIsConnected = useSelector(({ qrcode }) => qrcode.isConnected);

  useEffect(() => {
    window.addEventListener("resize", handleSize);
    let chatSocket = socket();

    chatSocket.registerChatHandler(handleReceiveChats);
    chatSocket.registerContactsHandler(handleReceiveContacts);
    chatSocket.registerMessageHandler(handleReceivedMessage);
    chatSocket.registerTransferUsers(handleReceiveTransferUsers);
    chatSocket.registerTransferContact(handleReceiveContact);
    setClient(chatSocket);
    return () => {
      chatSocket.disconnect();
      clearChat();
    }
  }, [qrcodeIsConnected]);
  
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
    if (!reference || !reference.current) return;
    reference.current.scrollTop = 99999999;
  };

  const messages = useSelector(({ message }) => message.allIds);
  useEffect(() => {
    if (!_reference || !_reference.current) return;
    _reference.current.scrollTop = 99999999;
    if (!reference || !reference.current) return;
    reference.current.scrollTop = 999999;
    console.log('ref', _reference);
  }, [messages, _reference])

  const handleReceivedMessage = message => {
    if (!message.message) return;
    dispatch(addMessage(message));
    if (!message.key.fromMe) {
      toggle();
    }
    if (!_reference || !_reference.current) return;
    _reference.current.scrollTop = 99999999;
  }

  const handleContactClick = contactId => {
    dispatch(setContactId(contactId));
    dispatch(setCurrentChatRoom(1));
    dispatch(loadFirstMessages(contactId))
    dispatch(setActiveContact(contactId));
    dispatch(readChat(contactId));
    dispatch(getProfilePicture(contactId));
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
      chatId: chat.id
    };
    chatSocket.sendMessage(newMsg);
    if (!reference || !reference.current) return;
    reference.current.scrollTop = 99999999;
  };
  
  const handleCloseTransferList = () => dispatch(closeTransferListDialog());
  const handleSelectTransferContact = (selectedUserId) => {
    transferNotify();
    dispatch(transferContact(selectedUserId, chatSocket));
    clearChat();
  }

  const handleReceiveContact = ({ chat, contact }) => {
    if (!contact || !chat) return;
    notifyReceiveContact();
    dispatch(setReceivedContact(chat, contact));
  }

  const handleSaveContact = contactName => {
    if (!contactName) return;
    dispatch(saveContact(contactName, chatSocket));
    handleCloseSaveContact();
  }

  const handleOpenContactList = () => {
    dispatch(openContactList());
  }

  const handleOpenSaveContact = () => dispatch(openSaveContactDialog());
  const handleCloseSaveContact = () => dispatch(closeSaveContactDialog());

  const isContactListOpen = useSelector(({ contact }) => contact.isContactListOpen);
  const openSaveContact = useSelector(({ contact }) => contact.openSaveContact);
  const openTransferList = useSelector(({ chat }) => chat.openTransferList);
  const currentChatRoom = useSelector(({ chat }) => chat.currentChatRoom);

  const [windowWidth, setContainerWidth] = useState(window.innerWidth);

  const handleSize = () => {
    setContainerWidth(window.innerWidth);
  }

  return (
    <div className="m-sm-30" style={{
      height: windowWidth > 1440 ? '94vh' : '100%',
      minHeight: '94vh',
      position: 'absolute',
      width: windowWidth > 1440 ? '88vw' : '100%',
      // minWidth: '70vw', 
      top: 0,
      left: windowWidth > 1440 ? 80 : 0,
      margin: windowWidth > 1440 ? '30px' : 0
    }}>
      <Card elevation={6} style={{ width: '100%', height: '100%', borderRadius: '0px' }}>
        <MatxSidenavContainer>
          <MatxSidenav
            width="300px"
            open
          >
            <ChatSidenav
              isContactListOpen={isContactListOpen}
              onOpenContactList={handleOpenContactList}
              handleContactClick={handleContactClick}
            />
          </MatxSidenav>
          {openTransferList && 
            <TransferListDialog 
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
          <AddContactDialog />
          <MatxSidenavContent>
            <ChatContainer
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
