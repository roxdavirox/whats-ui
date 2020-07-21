import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import {
  openImageModal,
} from '../../redux/actions/ChatActions';
import AudioPlayer from 'react-audio-player';
import { selectCurrentContact } from '../../redux/selectors/ContactSelectors';

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
  const currentContact = useSelector(selectCurrentContact);

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

  if (isQuote(message)){
    return (
      <div>
        <div 
          className="whitespace-pre-wrap"
          style={{ 
            backgroundColor: 'rgb(0 0 0 / 7%)',
            fontStyle: 'italic',
            borderRadius: '5px'
          }}
        >
          <div 
            style={{ fontWeight: 'bold' }}
          >
            {message
              .message
              .extendedTextMessage
              .contextInfo.participant === currentContact.jid ? currentContact.name : 'Você'}
          </div>
          {message.message.extendedTextMessage.contextInfo.quotedMessage.conversation}
        </div>
        <Divider />
        <div className="whitespace-pre-wrap">{message.message.extendedTextMessage.text}</div>
      </div>
    )
  }

  return <div className="whitespace-pre-wrap">{message.message.conversation}</div>;
}

export default Message;
