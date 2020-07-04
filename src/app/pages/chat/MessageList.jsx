import React from 'react';
import MessageItem from './MessageItem';

const MessageList = ({ messages }) => {
  const renderMessageItem = message => <MessageItem message={message} />;
  return (
    <>
      {messages && messages.map(renderMessageItem)}
    </>
  )
}

export default MessageList;