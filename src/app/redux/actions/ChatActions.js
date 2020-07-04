import api from '../../services/api';
import localStorageService from '../../services/localStorageService';

export const SET_TRANSFER_USERS = 'SET_TRANSFER_USERS';
export const SET_RECENT_CHATS = 'SET_RECENT_CHATS';
export const SET_CONTACTS = 'SET_CONTACTS';
export const ADD_RECENT_CHAT = 'ADD_RECENT_CHAT';
export const ADD_CONTACT = 'ADD_CONTACT';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const CLOSE_CONTACT_LIST_DIALOG = 'CLOSE_CONTACT_LIST_DIALOG';
export const OPEN_SAVE_CONTACT_DIALOG = 'OPEN_SAVE_CONTACT_DIALOG';
export const CLOSE_SAVE_CONTACT_DIALOG = 'CLOSE_SAVE_CONTACT_DIALOG';
export const OPEN_TRANSFER_LIST_DIALOG = 'OPEN_TRANSFER_LIST_DIALOG';
export const CLOSE_TRANSFER_LIST_DIALOG = 'CLOSE_TRANSFER_LIST_DIALOG';
export const SET_FETCHED_MESSAGE = 'SET_FETCHED_MESSAGE';
export const SET_MESSAGES = 'SET_MESSAGES';
export const SET_CONTACT_ID = 'SET_CONTACT_ID';
export const SET_CURRENT_CHAT_ROOM = 'SET_CURRENT_CHAT_ROOM';
export const SAVE_CONTACT = 'SAVE_CONTACT';
export const TRANSFER_CONTACT = 'TRANSFER_CONTACT';
export const SET_RECEIVED_CONTACT = 'SET_RECEIVED_CONTACT';
export const UPDATE_RECENT_CHAT = 'UPDATE_RECENT_CHAT';
export const OPEN_IMAGE_MODAL = 'OPEN_IMAGE_MODAL';
export const CLOSE_IMAGE_MODAL = 'CLOSE_IMAGE_MODAL';
export const GET_MESSAGES_BY_CONTACT_ID = 'GET_MESSAGES_BY_CONTACT_ID';
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';

export const getMessagesByContactId = contactId => async (dispatch, getState) => {
  const { chat } = getState();
  const { contacts } = chat;
  const contact = contacts[contactId];
  console.log('contact', contact);
  if (!contact) return;

  const { chat: contactChat } = contact;
  const { pagination: { start, end } } = contactChat;
  const token = localStorageService.getToken();

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const url = `/messages/${contactId}?start=${start}&end=${end}`;
  const response = await api.get(url, config);
  const { data } = response;
  const { messages, nextPagination, messageCount, hasMoreMessage } = data;

  dispatch({
    type: GET_MESSAGES_SUCCESS,
    payload: {
      messages,
      nextPagination,
      hasMoreMessage,
      messageCount,
      contactId
    },
  });
}

export const openImageModal = fileUrl => ({
  type: OPEN_IMAGE_MODAL,
  payload: { fileUrl }
});

export const closeImageModal = () => ({
  type: CLOSE_IMAGE_MODAL
});

export const setReceivedContact = (chat, contact) => ({
  type: SET_RECEIVED_CONTACT,
  payload: { chat, contact }
});

export const transferContact = (selectedUserId, socket) => (dispatch, getState) => {
  const { chat } = getState();
  const { contactId } = chat;
  socket.transferContact({ contactId, userId: selectedUserId });
  dispatch({ type: TRANSFER_CONTACT, });
}

export const saveContact = (name, socket) => (dispatch, getState) => {
  const { chat } = getState();
  const { contactId } = chat;
  socket.saveContact({ contactId, name });
  dispatch({
    type: SAVE_CONTACT,
    payload: { name }
  });
}

export const setTransferUsers = transferUsers => ({
  type: SET_TRANSFER_USERS,
  payload: { transferUsers }
});

export const setRecentChats = recentChats => ({
  type: SET_RECENT_CHATS,
  payload: { recentChats }
});

export const setContacts = contacts => ({
  type: SET_CONTACTS,
  payload: { contacts }
});

export const addRecentChat = recentChat => ({
  type: ADD_RECENT_CHAT,
  payload: { recentChat }
});

export const addContact = contact => ({
  type: ADD_CONTACT,
  payload: { contact }
});

export const setMessages = (messages, contactId) => ({
  type: SET_MESSAGES,
  payload: { messages, contactId }
});

export const setFetchedMessage = contactId => ({
  type: SET_FETCHED_MESSAGE,
  payload: { contactId }
});

export const setContactId = contactId => ({
  type: SET_CONTACT_ID,
  payload: { contactId }
});

export const setCurrentChatRoom = currentChatRoom => ({
  type: SET_CURRENT_CHAT_ROOM,
  payload: { currentChatRoom }
});

export const openTransferListDialog = () => ({ type: OPEN_TRANSFER_LIST_DIALOG });

export const closeTransferListDialog = () => ({ type: CLOSE_TRANSFER_LIST_DIALOG });

export const closeContactListDialog = () => ({ type: CLOSE_CONTACT_LIST_DIALOG });

export const openSaveContactDialog = () => ({ type: OPEN_SAVE_CONTACT_DIALOG });

export const closeSaveContactDialog = () => ({ type: CLOSE_SAVE_CONTACT_DIALOG });

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
        status: 'Online',
        name: phone,
        userId,
        ownerId,
        jid: key.remoteJid
      };
      const recentChat = {
        id: chatId, 
        contactId, 
        userId, 
        ownerId,
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
    dispatch({
      type: UPDATE_RECENT_CHAT,
      payload: { contactId, time: message.time }
    });
}

export const uploadImage = 
  ({
    imageFile,
    contactId,
    ownerId,
    userId,
  }) => async (dispatch) => {
    const fd = new FormData();
    fd.append('image', imageFile);
    fd.append('contactId', contactId);
    fd.append('ownerId', ownerId);
    fd.append('userId', userId);
    const response = await api.post('chat/image', fd);
    console.log('response', response);
}