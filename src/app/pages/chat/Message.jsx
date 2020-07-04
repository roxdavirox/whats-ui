import React from 'react';
import { useDispatch } from 'react-redux';
import {
  openImageModal,
} from '../../redux/actions/ChatActions';
import AudioPlayer from 'react-audio-player';

const isImage = message => message.message
  && message.message.imageMessage
  && message.message.imageMessage.fileUrl;

const isAudio = message => message.message
  && message.message.audioMessage
  && message.message.audioMessage.fileUrl;

const isQuote = message => message.message
  && message.message.extendedTextMessage;

const Message = ({ message }) => {
  const dispatch = useDispatch();
  if (isImage(message)) {
    const { message: _message } = message;
    const { imageMessage: { fileUrl, caption = '' } } = _message;
    return (
      <>
        {caption && <p><b>{caption}</b></p>}
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
      </>
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
    ? message.message.extendedTextMessage.text
    : message.message.conversation;

  return <span className="whitespace-pre-wrap">{textMessage}</span>;
}

export default Message;
