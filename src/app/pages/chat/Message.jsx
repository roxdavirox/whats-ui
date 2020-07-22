import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  && message.message.extendedTextMessage
  && message.message.extendedTextMessage.contextInfo;

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

  if (isQuote(message)) {
    const { extendedTextMessage } = message.message;
    const { contextInfo, text } = extendedTextMessage;
    const { participant, quotedMessage } = contextInfo;
    const { conversation } = quotedMessage;
    const style ={
      quoteContainer: {
        backgroundColor: 'rgb(0 0 0 / 7%)',
        fontStyle: 'italic',
        borderRadius: '5px',
        padding: '0 5px',
        borderLeft: 'inset',
        borderColor: 'rgb(0 137 255)'
      },
      quoteParticipant: {
        fontWeight: 'bold',
        margin: '0 2px 2px',
        fontSize: 'smaller' 
      },
      text: {
        paddingTop: '5px'
      }
    }
    return (
      <div>
        <div className="whitespace-pre-wrap" style={style.quoteContainer}>
          <div style={style.quoteParticipant}>
            {participant === currentContact.jid ? currentContact.name : 'Você'}
          </div>
          {conversation}
        </div>
        <div className="whitespace-pre-wrap" style={style.text}>
          {text}
        </div>
      </div>
    )
  }

  return <div className="whitespace-pre-wrap">{message.message.conversation}</div>;
}

export default Message;
