import React from 'react';
import shortid from "shortid";
import Message from './Message';

const style = {
  messageItem: {
    display: 'flex',
    flexDirection: 'row-reverse'
  }
};

const MessageItem = ({ message }) => {
  const { key: { fromMe } } = message;
  return (
    <div 
      className="flex items-start px-1 py-1" 
      style={fromMe ? style.messageItem : {}}
      key={shortid.generate()}
    >
      <div className={fromMe ? 'mr-4' : 'ml-4' }>
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
