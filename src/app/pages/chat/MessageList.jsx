import React from 'react';
import MessageItem from './MessageItem';
import { useSelector } from 'react-redux';
import { selectMessages } from '../../redux/selectors/MessageSelectors';

const MessageList = () => {
  const messages = useSelector(selectMessages);
  const renderMessageItem = message => <MessageItem message={message} />;
  return (
    <>
      {messages && messages.map(renderMessageItem)}
    </>
  )
}

export default MessageList;