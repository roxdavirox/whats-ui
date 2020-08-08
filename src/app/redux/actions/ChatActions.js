import api from '../../services/api';
import { normalize } from 'normalizr';
import { chatSchema, transferUserSchema } from '../schema';

const defaultPagination = {
  start: 0, end: 15
};

const defaultChat = {
  messages: [],
  pagination: defaultPagination,
  hasMoreMessage: false,
  firstMessageLoad: false,
  read: true,
};

export const ADD_RECENT_CHAT = 'ADD_RECENT_CHAT';
export const SET_RECENT_CHATS = 'SET_RECENT_CHATS';
export const ADD_NEW_CHAT = 'ADD_NEW_CHAT';
export const SET_CURRENT_CHAT_ROOM = 'SET_CURRENT_CHAT_ROOM';
export const UPDATE_RECENT_CHAT = 'UPDATE_RECENT_CHAT';
export const OPEN_IMAGE_MODAL = 'OPEN_IMAGE_MODAL';
export const CLOSE_IMAGE_MODAL = 'CLOSE_IMAGE_MODAL';
export const SET_CHAT = 'SET_CHAT';
export const UPDATE_CHAT_PAGINATION = 'UPDATE_CHAT_PAGINATION';
export const READ_CHAT = 'READ_CHAT';
export const GET_PROFILE_PICTURE = 'GET_PROFILE_PICTURE';

export const getProfilePicture = contactId => async (dispatch, getState) => {
  const { contact } = getState();
  
  const selectedContact = contact.byId[contactId];
  if (!selectedContact) return;

  try {
    const response = await api.post('/contact/picture', {
      jid: selectedContact.jid,
      contactId,
      ownerId: selectedContact.ownerId,
    });
  
    const { eurl } = response.data;

    dispatch({
      type: GET_PROFILE_PICTURE,
      payload: { eurl, contactId }
    });

  } catch(e) {
    console.error('error when get profile picture', e);
  }
}


export const addNewChat = (recentChat, contactId) => ({
  type: ADD_NEW_CHAT,
  payload: {
    recentChat,
    contactId
  }
});

export const openImageModal = fileUrl => ({
  type: OPEN_IMAGE_MODAL,
  payload: { fileUrl }
});

export const closeImageModal = () => ({
  type: CLOSE_IMAGE_MODAL
});

export const setRecentChats = recentChats =>  dispatch => {
  if (!recentChats) return;
  const defaultChats = recentChats.map(chat => ({
    ...chat, ...defaultChat
  }));
  const normalizedRecentChats = normalize(defaultChats, [chatSchema]);
  const { entities, result } = normalizedRecentChats;
  const byId = entities.chats;
  const allIds = result;
  dispatch({
    type: SET_RECENT_CHATS,
    payload: { byId, allIds }
  });
};

export const readChat = contactId => (dispatch, getState) => {
  const { chat } = getState();
  
  const currentChat = chat.byId[contactId];
  if (!currentChat) return;

  dispatch({
    type: READ_CHAT,
    payload: { contactId }
  });
};

export const setChat = (
    nextPagination,
    hasMoreMessage,
    messageCount,
    contactId,
    messages
  ) => ({
    type: SET_CHAT,
    payload: {
      nextPagination,
      hasMoreMessage,
      messageCount,
      contactId,
      messages
    }
});

export const addRecentChat = (recentChat, messageId, contactId) => ({
  type: ADD_RECENT_CHAT,
  payload: { recentChat, messageId, contactId }
});

export const setCurrentChatRoom = currentChatRoom => ({
  type: SET_CURRENT_CHAT_ROOM,
  payload: { currentChatRoom }
});

export const updateRecentChat = ({ contactId, lastMessageTime, messageId, read, lastTextMessage }) => ({
  type: UPDATE_RECENT_CHAT,
  payload: { contactId, lastMessageTime, messageId, read, lastTextMessage }
});

export const OPEN_TRANSFER_LIST_DIALOG = 'OPEN_TRANSFER_LIST_DIALOG';
export const CLOSE_TRANSFER_LIST_DIALOG = 'CLOSE_TRANSFER_LIST_DIALOG';
export const SET_TRANSFER_USERS = 'SET_TRANSFER_USERS';

export const setTransferUsers = transferUsers => dispatch => {
  const { entities, result } = normalize(transferUsers, [transferUserSchema]);
  const byId = entities.transferUsers;
  const allIds = result;
  dispatch({
    type: SET_TRANSFER_USERS,
    payload: { byId, allIds }
  })
};

export const openTransferListDialog = () => ({ type: OPEN_TRANSFER_LIST_DIALOG });

export const closeTransferListDialog = () => ({ type: CLOSE_TRANSFER_LIST_DIALOG });

export const uploadImage = ({
  files,
  ownerId,
  userId,
}) => async (dispatch, getState) => {
  const { contact } = getState();
  const { contactId } = contact;

  const imageFiles = Array.from(files);
  if (!imageFiles) return;

  imageFiles.map(async (imageFile) => {
    console.log('imageFile', imageFile);
    const fd = new FormData();
    fd.append('image', imageFile);
    fd.append('contactId', contactId);
    fd.append('ownerId', ownerId);
    fd.append('userId', userId);
    await api.post('chat/image', fd);
  });
}

export const uploadDocument = ({
  files,
  ownerId,
  userId
}) => async (dispatch, getState) => {
  const { contact } = getState();
  const { contactId } = contact;

  const docFiles = Array.from(files);
  if (!docFiles) return;

  docFiles.map(async (file) => {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('contactId', contactId);
    formData.append('ownerId', ownerId);
    formData.append('userId', userId);
    await api.post('chat/document', formData);
  })
  
}