import React from 'react';
import ChatAvatar from "./ChatAvatar";
import shortid from "shortid";
import Message from './Message';
import { useSelector } from 'react-redux';

const style = {
  messageItem: {
    display: 'flex',
    flexDirection: 'row-reverse'
  }
};

const MessageItem = ({ message }) => {
  const { 
    contactId,
    contacts,
  } = useSelector(({ chat }) => chat);
  const currentUser = useSelector(({ user }) => user);
  const currentContact = contacts[contactId] || false ;
  const { key: { fromMe } } = message;
  return (
    <div 
      className="flex items-start px-4 py-3" 
      style={fromMe ? style.messageItem : {}}
      key={shortid.generate()}
    >
      <ChatAvatar
        src={fromMe ? currentUser.eurl : currentContact.eurl}
      />
      <div className={fromMe ? 'mr-4' : 'ml-4' }>
        <p 
          className="text-muted m-0 mb-2"
          style={fromMe ? style.messageItem: {}}
        >
          {fromMe ? currentUser.name : currentContact.name}
        </p>
        <div style={{ display: 'flex', justifyContent: `${fromMe ? 'flex-end' : 'flex-start' }` }}>
          <div
            className={`px-4 py-2 mb-2 list__message ${fromMe ? "bg-primary text-white" : "bg-paper"}`}
            style={{display: 'inline-block'}}
          >
            <Message message={message} />
          </div>
        </div>
        <small 
          className="text-muted mb-0" 
          style={fromMe ? style.messageItem : {}}
        >
          {new Date(message.createdAt)
            .toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit'})
          }
        </small>
      </div>
    </div>
  )
}

export default MessageItem;
