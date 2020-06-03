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
export const SET_CONTACT_ID = 'SET_CONTACT_ID';
export const SET_CURRENT_CHAT_ROOM = 'SET_CURRENT_CHAT_ROOM';

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

export const addMessage = message => ({
  type: ADD_MESSAGE,
  payload: { message }
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
