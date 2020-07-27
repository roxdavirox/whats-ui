import { normalize } from 'normalizr';
import { messageSchema } from '../schema';
import localStorageService from '../../services/localStorageService';
import api from '../../services/api';
import {
  addContact
} from '../actions/ContactActions';
import {
  addRecentChat,
  updateRecentChat,
  setChat,
  UPDATE_CHAT_PAGINATION
} from '../actions/ChatActions';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_FETCHED_MESSAGE = 'SET_FETCHED_MESSAGE';
export const SET_MESSAGES = 'SET_MESSAGES';
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const LOAD_FIRST_MESSAGES = 'LOAD_FIRST_MESSAGES';
export const UPDATE_DELETED_MESSAGE = 'UPDATE_DELETED_MESSAGE';

export const loadFirstMessages = contactId => async (dispatch, getState) => {
  const { chat } = getState();
  const currentChat = chat.byId[contactId];
  if (!currentChat) return;

  const { firstMessageLoad } = currentChat;
  
  if (firstMessageLoad) return;
  dispatch({
    type: LOAD_FIRST_MESSAGES,
    payload: { contactId }
  });
  await dispatch(getMessagesByContactId(contactId));
}

export const fetchMessagesSuccess = (byId, allIds) => ({
  type: GET_MESSAGES_SUCCESS,
  payload: {
    byId, allIds,
  }
})

export const getMessagesByContactId = contactId => async (dispatch, getState) => {
  const { chat } = getState();
  const currentChat = chat.byId[contactId];
  if (!currentChat) return;

  const { pagination: { start = 0, end= 15 } } = currentChat;
  const token = localStorageService.getToken();

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const url = `/messages/${contactId}?start=${start}&end=${end}`;
  const response = await api.get(url, config);
  const { data } = response;
  const { messages, nextPagination, messageCount, hasMoreMessage } = data;

  if (!messages) return;
  const deleteMessages = messages.filter(m => m.message.protocolMessage);
  const messagesWithKeyId = messages.filter(m => m.key.id);
  if (!messagesWithKeyId) return;
  const mappedMessages = messagesWithKeyId.map(m => ({
    ...m,
    deleted: deleteMessages.some(deletedMessage =>
      deletedMessage.message.protocolMessage.key.id === m.key.id)
  }))

  const byId = mappedMessages.reduce((all, crr) => ({
    ...all, [crr.key.id]: crr
  }), {});

  const allIds = mappedMessages.map(m => m.key.id);
  dispatch(fetchMessagesSuccess(byId, allIds));

  dispatch(setChat(
    nextPagination,
    hasMoreMessage,
    messageCount,
    contactId,
    allIds
  ));
}

export const setMessages = (messages, contactId) => ({
  type: SET_MESSAGES,
  payload: { messages, contactId }
});

export const setFetchedMessage = contactId => ({
  type: SET_FETCHED_MESSAGE,
  payload: { contactId }
});

const isDeletedMessage = message => message.message
  && message.message.protocolMessage;

export const updateDeletedMessage = message => (dispatch, getState) => {
  dispatch({
    type: UPDATE_DELETED_MESSAGE,
    payload: {
      messageId: message.message.protocolMessage.key.id
    }
  })
}

export const addMessage = (message) => (dispatch, getState) => {
  const { contact } = getState();
    const { contactId, userId, ownerId, chatId, key } = message;

    const contactNotExists = !contact.byId[contactId];
    if (contactNotExists) {
      console.log('contactNotExists', contactNotExists);
      const phone = key.remoteJid.split('@')[0];

      const newContact = {
        id: contactId,
        eurl: 'assets/faces/default-avatar.png',
        name: phone,
        phone,
        notify: phone,
        short: phone,
        userId,
        ownerId,
        jid: key.remoteJid,
        active: true
      };
      const recentChat = {
        id: chatId, 
        contactId, 
        userId, 
        ownerId,
        lastMessageTime: message.createdAt,
      };
      dispatch({
        type: ADD_MESSAGE,
        payload: { message }
      });
      dispatch(addRecentChat(recentChat, message.key.id, contactId));
      dispatch(addContact(newContact));
      return;
    }

    dispatch({
      type: ADD_MESSAGE,
      payload: { message }
    });
    
    if (isDeletedMessage(message)) {
      dispatch(updateDeletedMessage(message));
    }
    
    dispatch({
      type: UPDATE_CHAT_PAGINATION,
      payload: { contactId }
    });
    dispatch(updateRecentChat(
      contactId,
      message.createdAt,
      message.key.id
    ));
}