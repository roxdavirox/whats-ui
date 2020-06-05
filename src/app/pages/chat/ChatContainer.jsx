import React, { Fragment, useState } from "react";
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


const WrapperTextField = props => {
  const [message, setMessage] = useState('');
  const sendMessageOnEnter = event => {
    if (event.key === "Enter" && !event.shiftKey) {
      console.log('mew', message);
      let m = message.trim();
      if (m !== "") props.onSend(message.trim());
      setMessage('');
    }
  };
  
  return (
    <TextField
      label="Type your message here*"
      value={message}
      onChange={e => setMessage(e.target.value)}
      onKeyDown={sendMessageOnEnter}
      fullWidth
      multiline={true}
      rows={1}
      variant="outlined"
    />
  )
}

const ChatContainer = ({
  toggleSidenav,
  setRef,
  handleMessageSend,
  handleOpenTransferList,
  onSaveDialogOpen,
}) => {
  let [message, setMessage] = React.useState("");
  const { 
    contactId,
    contacts,
    currentUser,
    currentChatRoom
  } = useSelector(({ chat }) => chat);
  const currentContact = contacts[contactId] || false ;
  return (
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
              <p className="text-muted m-0 mb-2" style={message.key.fromMe 
                ? { display: 'flex', flexDirection: 'row-reverse'} 
                : {}}>{message.key.fromMe ? currentUser.name : currentContact.name}</p>
              <div
                className={`px-4 py-2 mb-2 list__message ${
                  message.key.fromMe
                    ? "bg-primary text-white"
                    : "bg-paper"
                }`}
              >
                <span className="whitespace-pre-wrap">{message.message.conversation}</span>
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
        <div className="flex items-center px-4 py-2">
          <WrapperTextField onSend={handleMessageSend}/>
          <div>
            <Fab
              onClick={() => {
                if (message.trim() !== "") handleMessageSend(message);
                setMessage("");
              }}
              color="primary"
              className="ml-4"
            >
              <Icon>send</Icon>
            </Fab>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
