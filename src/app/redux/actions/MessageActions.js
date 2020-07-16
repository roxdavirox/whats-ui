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
  setChatPagination
} from '../actions/ChatActions';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_FETCHED_MESSAGE = 'SET_FETCHED_MESSAGE';
export const SET_MESSAGES = 'SET_MESSAGES';
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const LOAD_FIRST_MESSAGES = 'LOAD_FIRST_MESSAGES';

export const loadFirstMessages = contactId => async (dispatch, getState) => {
  const { chat } = getState();
  const { contacts, isFetching } = chat;
  if (isFetching) return;
  const contact = contacts[contactId];
  if (!contact) return;

  const { chat: contactChat } = contact;
  const { firstMessageLoad } = contactChat;
  console.log('firstMessageLoad', firstMessageLoad)
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
  const currentChat = chat[contactId];
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

  const normalizedMessages = normalize(messages, [messageSchema]);
  const { entities: byId, result: allIds } = normalizedMessages;
  dispatch(fetchMessagesSuccess(byId, allIds));

  dispatch(setChatPagination(
    nextPagination,
    hasMoreMessage,
    messageCount,
    contactId
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

export const addMessage = (message) => (dispatch, getState) => {
  const { chat: { contacts } } = getState();
    const { contactId, userId, ownerId, chatId, key } = message;

    const contactNotExists = !contacts[contactId];
    if (contactNotExists) {
      console.log('contactNotExists', contactNotExists);
      const phone = key.remoteJid.split('@')[0];

      const _contact = {
        id: contactId,
        eurl: 'assets/faces/default-avatar.png',
        name: phone,
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
        contact: _contact
      };
      dispatch(addRecentChat(recentChat));
      dispatch(addContact({ 
        ..._contact,
        chat: { messages: [message] }
      }));
      return;
    }
    dispatch({
      type: ADD_MESSAGE,
      payload: { contactId, message }
    });
    dispatch(updateRecentChat(contactId, message.createdAt));
}