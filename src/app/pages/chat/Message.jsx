import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  openImageModal,
} from '../../redux/actions/ChatActions';
import AudioPlayer from 'react-audio-player';
import { selectCurrentContact } from '../../redux/selectors/ContactSelectors';
import GetAppIcon from '@material-ui/icons/GetApp';
import {
  Tooltip
} from "@material-ui/core";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import ForwardIcon from '@material-ui/icons/Forward';

const isImage = message => message.message
  && message.message.imageMessage
  && message.message.imageMessage.fileUrl;

const isImageForwarded = message => message.message
  && message.message.imageMessage
  && message.message.imageMessage.contextInfo
  && message.message.imageMessage.contextInfo.isForwarded;

const isAudio = message => message.message
  && message.message.audioMessage
  && message.message.audioMessage.fileUrl;

const isAudioForewarded = message => isAudio(message)
  && message.message.audioMessage.contextInfo.isForwarded;

const isQuote = message => message.message
  && message.message.extendedTextMessage
  && message.message.extendedTextMessage.contextInfo
  && message.message.extendedTextMessage.contextInfo.quotedMessage;

const isForwarded = message => message.message
  && message.message.extendedTextMessage
  && message.message.extendedTextMessage.contextInfo
  && message.message.extendedTextMessage.contextInfo.isForwarded;

const isDocument = message => message.message
  && message.message.documentMessage
  && message.message.documentMessage.fileUrl;

const isDocumentForwarded = message => isDocument(message)
  && message.message.documentMessage.contextInfo
  && message.message.documentMessage.contextInfo.isForwarded;

const isDeleted = message => message.message
  && message.deleted;

const Document = ({ message }) => {
  const { documentMessage } = message.message;
  const { fileName, fileUrl } = documentMessage;
  return (
    <>
      {isDocumentForwarded(message) && (
        <div>
          <Tooltip title="Mensagem encaminhada">
            <div style={{ fontStyle: 'italic', color: '#827c7c' }}>
              <ForwardIcon 
                style={{ height: '0.5em', width: '0.5em'}}
                />
              Encaminhada.
            </div>
          </Tooltip>
        </div>
      )}
      <div style={{
        display: 'flex',
        backgroundColor: '#c0c0c029',
        borderRadius: '4px',
        padding: '5px 5px'
      }}>
        <div>
          <Tooltip title="Documento">
            <InsertDriveFileIcon />
          </Tooltip>
        </div>
        <div style={{
          padding: '0 10px',
          fontStyle: 'italic'
        }}>
          {fileName}
        </div>
        <div style={{
          padding: '0 5px',
          backgroundColor: '#aaaeb326',
          borderRadius: '50%'
        }}>
          <Tooltip title="Download">
            <a href={fileUrl}><GetAppIcon style={{ padding: '2px 2px'}}/></a>
          </Tooltip>
        </div>
      </div>
    </>
  )
};

const Message = ({ message }) => {
  const dispatch = useDispatch();
  const currentContact = useSelector(selectCurrentContact);
  const selectedMessage = useSelector(({ message:_message }) => {
    if (!isQuote(message)) return {};

    const selectedMsg = _message.byId[message.message.extendedTextMessage.contextInfo.stanzaId];
    if (!selectedMsg) return {};

    return selectedMsg;
  });

  if (isImage(message)) {
    const { message: _message } = message;
    const { imageMessage: { fileUrl, caption = '' } } = _message;
    return (
      <>
        {isImageForwarded(message) && (
          <div>
            <Tooltip title="Imagem encaminhada">
              <div style={{ fontStyle: 'italic', color: '#827c7c' }}>
                <ForwardIcon 
                  style={{ height: '0.5em', width: '0.5em'}}
                  />
                Encaminhada.
              </div>
            </Tooltip>
          </div>
        )}
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
      <>
        {isAudioForewarded(message) && (
          <div>
            <Tooltip title="Mensagem encaminhada">
              <div style={{ fontStyle: 'italic', color: '#827c7c' }}>
                <ForwardIcon 
                  style={{ height: '0.5em', width: '0.5em'}}
                  />
                Encaminhada.
              </div>
            </Tooltip>
          </div>
        )}
        <AudioPlayer
          src={fileUrl}
          autoPlay={false}
          controls
        />
      </>
    );
  }

  if (isDocument(message)) {
    return <Document message={message} />;
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
          {isImage(selectedMessage) && <img src={selectedMessage.message.imageMessage.fileUrl} />}
          {isAudio(selectedMessage) 
            && <AudioPlayer
              src={selectedMessage.message.audioMessage.fileUrl}
              autoPlay={false}
              controls
            />
          }
          {isDocument(selectedMessage)
            && <Document message={selectedMessage} />
          }
          {conversation && conversation}
        </div>
        <div className="whitespace-pre-wrap" style={style.text}>
          {text}
        </div>
      </div>
    )
  }

  if (isDeleted(message)) {
    return (
      <div>
        <div>
          <Tooltip title="Mensagem removida">
            <div style={{ fontStyle: 'italic', backgroundColor: '#dcdcdc52', color: '#827c7c' }}>
              <NotInterestedIcon 
                style={{ height: '0.5em', width: '0.5em'}}
                />
              Essa mensagem foi apagada do whatsapp.
            </div>
          </Tooltip>
        </div>
        <div className="whitespace-pre-wrap" style={{
          paddingTop: '5px'
        }}>{message.message.conversation}</div>
      </div>
    )
  }

  if (isForwarded(message)) {
    const { extendedTextMessage } = message.message;
    const { text } = extendedTextMessage;
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
        <div>
          <Tooltip title="Mensagem encaminhada">
            <div style={{ fontStyle: 'italic', color: '#827c7c' }}>
              <ForwardIcon 
                style={{ height: '0.5em', width: '0.5em'}}
                />
              Encaminhada.
            </div>
          </Tooltip>
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
