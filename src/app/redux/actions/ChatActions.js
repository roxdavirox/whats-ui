import api from '../../services/api';
import { normalize } from 'normalizr';
import { chatSchema } from '../schema';

const defaultPagination = {
  start: 0, end: 15
};

const defaultChat = {
  messages: [],
  pagination: defaultPagination,
  hasMoreMessage: false,
  firstMessageLoad: false,
};

export const ADD_RECENT_CHAT = 'ADD_RECENT_CHAT';
export const SET_RECENT_CHATS = 'SET_RECENT_CHATS';

export const SET_CURRENT_CHAT_ROOM = 'SET_CURRENT_CHAT_ROOM';
export const UPDATE_RECENT_CHAT = 'UPDATE_RECENT_CHAT';
export const OPEN_IMAGE_MODAL = 'OPEN_IMAGE_MODAL';
export const CLOSE_IMAGE_MODAL = 'CLOSE_IMAGE_MODAL';
export const SET_CHAT = 'SET_CHAT';
export const UPDATE_CHAT_PAGINATION = 'UPDATE_CHAT_PAGINATION';

export const openImageModal = fileUrl => ({
  type: OPEN_IMAGE_MODAL,
  payload: { fileUrl }
});

export const closeImageModal = () => ({
  type: CLOSE_IMAGE_MODAL
});

export const setRecentChats = recentChats =>  dispatch => {
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

export const updateRecentChat = (contactId, lastMessageTime, messageId) => ({
  type: UPDATE_RECENT_CHAT,
  payload: { contactId, lastMessageTime, messageId }
});

export const OPEN_TRANSFER_LIST_DIALOG = 'OPEN_TRANSFER_LIST_DIALOG';
export const CLOSE_TRANSFER_LIST_DIALOG = 'CLOSE_TRANSFER_LIST_DIALOG';
export const SET_TRANSFER_USERS = 'SET_TRANSFER_USERS';

export const setTransferUsers = transferUsers => ({
  type: SET_TRANSFER_USERS,
  payload: { transferUsers }
});

export const openTransferListDialog = () => ({ type: OPEN_TRANSFER_LIST_DIALOG });

export const closeTransferListDialog = () => ({ type: CLOSE_TRANSFER_LIST_DIALOG });

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