import api from '../../services/api';
import {
  addRecentChat,
  setCurrentChatRoom
} from '../actions/ChatActions';

import { normalize } from 'normalizr';
import { contactSchema } from '../schema';

export const SET_CONTACTS = 'SET_CONTACTS';
export const ADD_CONTACT = 'ADD_CONTACT';
export const CLOSE_CONTACT_LIST_DIALOG = 'CLOSE_CONTACT_LIST_DIALOG';
export const OPEN_SAVE_CONTACT_DIALOG = 'OPEN_SAVE_CONTACT_DIALOG';
export const CLOSE_SAVE_CONTACT_DIALOG = 'CLOSE_SAVE_CONTACT_DIALOG';
export const SET_CONTACT_ID = 'SET_CONTACT_ID';
export const SAVE_CONTACT = 'SAVE_CONTACT';
export const TRANSFER_CONTACT = 'TRANSFER_CONTACT';
export const SET_RECEIVED_CONTACT = 'SET_RECEIVED_CONTACT';
export const OPEN_CONTACT_LIST = 'OPEN_CONTACT_LIST';
export const OPEN_ADD_CONTACT_DIALOG = 'OPEN_ADD_CONTACT_DIALOG';
export const CLOSE_ADD_CONTACT_DIALOG = 'CLOSE_ADD_CONTACT_DIALOG';
export const ADD_NEW_CONTACT = 'ADD_NEW_CONTACT';
export const FINISH_CONTACT = 'FINISH_CONTACT';

export const closeContactListDialog = () => ({ type: CLOSE_CONTACT_LIST_DIALOG });

export const openSaveContactDialog = () => ({ type: OPEN_SAVE_CONTACT_DIALOG });

export const closeSaveContactDialog = () => ({ type: CLOSE_SAVE_CONTACT_DIALOG });

export const addContact = contact => ({
  type: ADD_CONTACT,
  payload: { contact }
});

export const setContacts = contacts => dispatch => {
  const normalizedContacts = normalize(contacts, [contactSchema]);
  const { entities, result: allIds } = normalizedContacts;
  dispatch({
    type: SET_CONTACTS,
    payload: { 
      byId: entities.contacts, 
      allIds
    }
  });
}

export const openContactList = () => ({
  type: OPEN_CONTACT_LIST
});

export const openAddContactDialog = () => ({
  type: OPEN_ADD_CONTACT_DIALOG
});

export const closeAddContactDialog = () => ({
  type: CLOSE_ADD_CONTACT_DIALOG
});

export const addNewContact = (name, phone) => async (dispatch, getState) => {
  const { user } = getState();

  try {
    const response = await api.post('/contact', {
      name,
      phone,
      ownerId: user.ownerId,
      userId: user.id,
    });

    const { contact, chat } = await response.data;
    console.log('contact response', contact);
    const _contact = {
      ...contact,
      eurl: 'assets/faces/default-avatar.png',
    };

    const recentChat = {
      id: chat.id, 
      contactId: contact.id, 
      ownerId: user.ownerId,
      userId: user.id,
      lastMessageTime: chat.lastMessageTime,
      contact: _contact
    };
    dispatch(addRecentChat(recentChat));
    dispatch(addContact({ 
      ..._contact, 
      chat: { messages: [] }
    }));
    dispatch(setContactId(contact.id));
    dispatch(setCurrentChatRoom(1));
  } catch(e) {
    // handle error
    console.error('error:', e);
  }
}

export const setReceivedContact = (chat, contact) => dispatch => {
  const defaultPagination = {
    start: 0, end: 15
  };
  
  const defaultChat = {
    messages: [],
    pagination: defaultPagination,
    hasMoreMessage: false,
    firstMessageLoad: false,
  };
  const receivedChat = {
    id: chat.id,
    lastMessageTime: chat.lastMessageTime,
    contactId: contact.id, 
    userId: contact.userId, 
    ownerId: contact.ownerId,
    ...defaultChat,
    ...chat
  };
  dispatch({
    type: SET_RECEIVED_CONTACT,
    payload: { chat: receivedChat, contact }
  });
}

export const transferContact = (selectedUserId, socket) => (dispatch, getState) => {
  const { contact } = getState();
  const { contactId } = contact;
  socket.transferContact({ contactId, userId: selectedUserId });
  dispatch({
    type: TRANSFER_CONTACT,
    payload: { contactId } 
  });
}

export const finishContact = () => async (dispatch, getState) => {
  const { contact, user } = getState();
  const { contactId } = contact;
  try {
    await api.post('/contact/finish', {
      contactId,
      ownerId: user.ownerId,
    });
    dispatch(setContactId(''));
    dispatch(setCurrentChatRoom(''));
    dispatch({
      type: FINISH_CONTACT,
      payload: { contactId }
    });
  } catch(e) {
    // handle error
    console.error(e);
  }
}

export const saveContact = (name, socket) => (dispatch, getState) => {
  const { contact } = getState();
  const { contactId } = contact;
  socket.saveContact({ contactId, name });
  dispatch({
    type: SAVE_CONTACT,
    payload: { name }
  });
}

export const setContactId = contactId => ({
  type: SET_CONTACT_ID,
  payload: { contactId }
});