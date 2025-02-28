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

export const FIX_CHAT = 'FIX_CHAT';
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

export const fixChat = contactId => async dispatch => {
  if (!contactId) return;
  const response = await api.post(`/chat/fix/${contactId}`);
  const { fixed } = response.data;

  dispatch({
    type: FIX_CHAT,
    payload: { contactId, fixed }
  });
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

export const setRecentChats = recentChats => dispatch => {
  if (!recentChats) return;
  const defaultChats = recentChats.map(chat => ({
    ...defaultChat,
    ...chat, 
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

export const readChat = contactId => async (dispatch, getState) => {
  const { chat } = getState();
  
  const currentChat = chat.byId[contactId];
  if (!currentChat) return;
  const response = await api.post(`/chat/read/${contactId}`);
  const { updated } = response.data;
  console.log('response updated chat read', updated);
  dispatch({
    type: READ_CHAT,
    payload: { contactId, read: updated }
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
  });
}

export const uploadVideo = ({
  files,
  ownerId,
  userId
}) => async (dispatch, getState) => {
  const { contact } = getState();
  const { contactId } = contact;

  const videoFiles = Array.from(files);
  if (!videoFiles) return;

  videoFiles.map(async (videoFile) => {
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('contactId', contactId);
    formData.append('ownerId', ownerId);
    formData.append('userId', userId);
    await api.post('chat/video', formData);
  });
}

export const uploadAudio = ({
  blob,
  ownerId,
  userId
}) => async (dispatch, getState) => {
  const { contact } = getState();
  const { contactId } = contact;

  const formData = new FormData();
    formData.append('audio', blob);
    formData.append('contactId', contactId);
    formData.append('ownerId', ownerId);
    formData.append('userId', userId);
    await api.post('chat/audio', formData);
}