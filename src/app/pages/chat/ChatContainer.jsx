import React, { Fragment, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
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
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CallEndIcon from '@material-ui/icons/CallEnd';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ImagePreviewDialog from './ImagePreviewDialog';
import { openImageModal, uploadImage } from '../../redux/actions/ChatActions';
import AudioPlayer from 'react-audio-player';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

const TextContainer = props => {
  const [message, setMessage] = useState('');
  const sendMessageOnEnter = event => {
    if (event.key === "Enter" && !event.shiftKey) {
      let msg = message.trim();
      if (msg !== "") props.onSend(message.trim());
      setMessage('');
    }
  };

  const handleSend = () => {
    let msg = message.trim();
    if (msg !== "") props.onSend(message.trim());
    setMessage('');
  }
  
  return (
    <div className="flex items-center px-4 py-2">
      <TextField
        label="Digite aqui"
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
        onClick={handleSend}
        color="primary"
        className="ml-4"
      >
        <Icon>send</Icon>
      </Fab>
    </div>
  </div>
  )
}

const isImage = message => message.message
  && message.message.imageMessage
  && message.message.imageMessage.fileUrl;

const isAudio = message => message.message
  && message.message.audioMessage
  && message.message.audioMessage.fileUrl;

const isQuote = message => message.message
  && message.message.extendedMessage;

const MessageComponent = ({ message }) => {
  const dispatch = useDispatch();
  if (isImage(message)) {
    const { message: _message } = message;
    const { imageMessage: { fileUrl } } = _message;
    return (
        <img
          onClick={() => dispatch(openImageModal(fileUrl))}
          src={fileUrl}
          style={{
            display: 'block',
            maxWidth: '230px',
            maxHeight: '195px',
            minWidth: '195px',
            width: '100%',
            height: 'auto',
            objectFit: 'cover'
          }}
          alt="arquivo de imagem"
        />
    );
  }

  if (isAudio(message)) {
    const { message: _message } = message;
    const { audioMessage: { fileUrl } } = _message;

    return (
      <AudioPlayer
        src={fileUrl}
        autoPlay={false}
        controls
      />
    );
  }

  const textMessage = isQuote(message) 
    ? message.message.extendedMessage.text
    : message.message.conversation;
    
  return <span className="whitespace-pre-wrap">{textMessage}</span>;
}

const ChatContainer = ({
  toggleSidenav,
  setRef,
  handleMessageSend,
  handleOpenTransferList,
  onSaveDialogOpen,
}) => {
  const { 
    contactId,
    contacts,
    currentChatRoom,
    imageModalOpen
  } = useSelector(({ chat }) => chat);

  const currentUser = useSelector(({ user }) => user);
  const currentContact = contacts[contactId] || false ;
  const inputRef = useRef();
  const dispatch = useDispatch();

  const handleUploadImageClick = () => {
    inputRef.current.click();
  }

  const handleImageChange = e => {
    e.preventDefault();
    let [file] = e.target.files;
    if (!file) return;
    dispatch(uploadImage({ 
      imageFile: file,
      contactId,
      ownerId: currentUser.ownerId,
      userId: currentUser.id,
    }));
  };

  return (
    <>
      <input
        hidden
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
        ref={inputRef} />
      {imageModalOpen && <ImagePreviewDialog />}
      <div className="chat-container flex-column position-relative">
        <div className="chat-container__topbar flex items-center justify-between p-1 bg-primary">
          <div className="flex items-center" style={{ minHeight: '48px' }}>
            <div className="show-on-mobile">
              <IconButton onClick={toggleSidenav}>
                <Icon className="text-white">short_text</Icon>
              </IconButton>
            </div>

            <div className="hide-on-mobile">
              <div className="pl-3"></div>
            </div>

            {currentContact && (
              <Fragment>
                <ChatAvatar
                  src={currentContact.eurl}
                  status={currentContact.status}
                />
                <h5 className="position-relative ml-4 whitespace-pre mb-0 font-medium text-18 text-white">
                  {currentContact.name}
                </h5>
              </Fragment>
            )}
          </div>
          {currentChatRoom !== "" && (
            <MatxMenu
              menuButton={
                <IconButton>
                  <Icon className="text-white">more_vert</Icon>
                </IconButton>
              }
            >
              <div style={{ minWidth: '160px' }}>
                <MenuItem 
                  style={{ justifyContent: 'space-between', width: '100%' }}
                  className="flex items-center" onClick={() => {
                  onSaveDialogOpen();
                }}>
                  Salvar contato <PersonAddIcon />
                </MenuItem>
                <MenuItem className="flex items-center" onClick={handleOpenTransferList} style={{ justifyContent: 'space-between', width: '100%' }}>
                  Encaminhar<ArrowForwardIosIcon />
                </MenuItem>
                <MenuItem className="flex items-center" style={{ justifyContent: 'space-between', width: '100%' }}>
                  Finalizar <CallEndIcon />
                </MenuItem>
                <MenuItem className="flex items-center" onClick={handleUploadImageClick} style={{ justifyContent: 'space-between', width: '100%' }}>
                  Enviar imagem <InsertPhotoIcon />
                </MenuItem>
              </div>
            </MatxMenu>
          )}
        </div>

        <Scrollbar
          containerRef={ref => setRef({ current: ref })}
          className="chat-message-list flex-grow position-relative"
        >
          {currentChatRoom === "" && (
            <div className="flex-column justify-center items-center h-full">
              <EmptyMessage />
              <p>Selecioine uma conversa</p>
            </div>
          )}
          {currentContact.chat && currentContact.chat.messages.map((message, index) => (
            <div 
              className="flex items-start px-4 py-3" 
              style={message.key.fromMe 
                  ? { display: 'flex', flexDirection: 'row-reverse'} 
                  : {}}
                key={shortid.generate()}>
              <ChatAvatar src={message.key.fromMe ? currentUser.eurl : currentContact.eurl} status={'Online'} />
              <div className={message.key.fromMe ? 'mr-4' : 'ml-4' }>
                <p 
                  className="text-muted m-0 mb-2"
                  style={message.key.fromMe 
                    ? { display: 'flex', flexDirection: 'row-reverse'} 
                    : {}}>
                      {message.key.fromMe ? currentUser.name : currentContact.name}
                </p>
                <div
                  className={`px-4 py-2 mb-2 list__message ${
                    message.key.fromMe
                      ? "bg-primary text-white"
                      : "bg-paper"
                  }`}

                >
                  <MessageComponent message={message} />
                </div>
                <small className="text-muted mb-0" style={message.key.fromMe 
                  ? { display: 'flex', flexDirection: 'row-reverse'} 
                  : {}}>
                  {getTimeDifference(new Date(message.time))} ago
                </small>
              </div>
            </div>
          ))}
          {/* <div ref={ref => setBottomRef(ref)} /> */}
        </Scrollbar>

        <Divider />

        {currentChatRoom !== "" && (
            <TextContainer onSend={handleMessageSend}/>

        )}
      </div>
    </>
  );
};

export default ChatContainer;
