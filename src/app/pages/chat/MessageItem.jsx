import React, { useState } from 'react';
import shortid from "shortid";
import Message from './Message';
import ExpandMenuButton from 'app/components/buttons/icons/ExpandMoreButton';

const style = {
  messageItem: {
    display: 'flex',
    flexDirection: 'row-reverse',
  }
};

const MessageItem = ({ message }) => {
  const { key: { fromMe } } = message;
  const [isMouseOver, setMouseOver] = useState(false);

  const handleMouseOver = () => setMouseOver(true);
  const handleMouseLeave = () => setMouseOver(false);

  return (
    <div 
      className="flex items-start px-1 py-1" 
      style={fromMe ? style.messageItem : { }}
      key={shortid.generate()}
    >
      <div className={fromMe ? 'mr-4' : 'ml-4' } style={{ maxWidth: '60%' }}>
        <div style={{ display: 'flex', justifyContent: `${fromMe ? 'flex-end' : 'flex-start' }` }}>
          <div
            className={`px-2 py-2 mb-2 list__message ${fromMe ? "bg-primary text-white" : "bg-paper"}`}
            style={{display: 'inline-block', position: 'relative' }}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            {isMouseOver && (
              <ExpandMenuButton style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '18px',
                height: '18px',
                backgroundColor: '#56595c4f' }}
                />
            )}
            <Message message={message} />
          </div>
        </div>
        <small 
          className="text-muted mb-0" 
          style={fromMe ? style.messageItem : {}}
        >
          {message.userName && fromMe && `${message.userName} - `}
          {new Date(message.createdAt)
            .toLocaleString('pt-BR', { 
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })
          }
        </small>
      </div>
    </div>
  )
}

export default MessageItem;
