
import { 
  ADD_RECENT_CHAT,
  SET_TRANSFER_USERS,
  SET_RECENT_CHATS,
  OPEN_TRANSFER_LIST_DIALOG,
  CLOSE_TRANSFER_LIST_DIALOG,
  SET_CURRENT_CHAT_ROOM,
  UPDATE_RECENT_CHAT,
  OPEN_IMAGE_MODAL,
  CLOSE_IMAGE_MODAL,
  SET_CHAT,
  UPDATE_CHAT_PAGINATION,
  ADD_NEW_CHAT,
  READ_CHAT
} from '../actions/ChatActions';
import { LOAD_FIRST_MESSAGES } from '../actions/MessageActions';
import { SET_RECEIVED_CONTACT, TRANSFER_CONTACT } from '../actions/ContactActions';

const initialState = {
  isContactListOpen: false,
  openTransferListDialog: false,
  openSaveContact: false,
  transferUsers: [],
  contactId: '',
  fetchedMessages: {},
  currentChatRoom: '',
  imageModalOpen: false,
  fileUrl: null,
  isFetching: false,
  openAddContact: false,
  byId: {},
  allIds: [],
};

const ChatReducer = function(state = initialState, action) {
  switch(action.type) {
    case SET_RECEIVED_CONTACT: {
      const { chat, contact } = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [contact.id]: chat
        },
        allIds: [...state.allIds, contact.id]
      }
    }

    case OPEN_IMAGE_MODAL: {
      return {
        ...state,
        imageModalOpen: true,
        fileUrl: action.payload.fileUrl
      };
    }

    case CLOSE_IMAGE_MODAL: {
      return {
        ...state,
        imageModalOpen: false,
        fileUrl: null
       };
    }

    case ADD_RECENT_CHAT: {
      const { recentChat, messageId, contactId } = action.payload;
      const defaultPagination = {
        start: 0, end: 15
      };
      const defaultChat = {
        messages: [messageId],
        pagination: {
          start: defaultPagination.start + 1,
          end: defaultPagination.end + 1
        },
        hasMoreMessage: false,
        firstMessageLoad: false,
        read: true,
      };
      return {
        ...state,
        byId: {
          ...state.byId,
          [contactId]: {
            ...recentChat,
            ...defaultChat
          }
        },
        allIds: [...state.allIds, contactId]
      };
    }

    case ADD_NEW_CHAT: {
      const { recentChat, contactId } = action.payload;
      const defaultPagination = {
        start: 0, end: 15
      };
      const defaultChat = {
        messages: [],
        pagination: defaultPagination,
        hasMoreMessage: false,
        firstMessageLoad: false,
      };
      return {
        ...state,
        byId: {
          ...state.byId,
          [contactId]: {
            ...recentChat,
            ...defaultChat
          }
        },
        allIds: [...state.allIds, contactId]
      };
    }

    case UPDATE_RECENT_CHAT: {
      const { contactId, lastMessageTime, messageId, read, lastTextMessage } = action.payload;
      const { byId } = state;
      const chat = byId[contactId];
      return {
        ...state,
        byId: {
          ...state.byId,
          [contactId]: {
            ...chat,
            lastMessageTime,
            active: true,
            read,
            lastTextMessage,
            messages: [...chat.messages, messageId]
          }
        }
      }
    }

    case LOAD_FIRST_MESSAGES: {
      const { contactId } = action.payload;
      const chat = state.byId[contactId];
      return {
        ...state,
        byId: {
          ...state.byId,
          [contactId]: {
            ...chat,
            firstMessageLoad: true,
          }
        }
      }
    }

    case READ_CHAT: {
      const { contactId } = action.payload;

      const { byId } = state;
      const chat = byId[contactId];
      return {
        ...state,
        byId: {
          ...byId,
          [contactId]: {
            ...chat,
            read: true,
          }
        }
      }
    }

    case SET_CHAT: {
      const { 
        nextPagination,
        hasMoreMessage,
        messageCount,
        contactId,
        messages } = action.payload;
        
        const chat = state.byId[contactId];
        const updatedChat = {
          ...chat,
          pagination: nextPagination,
          hasMoreMessage,
          messageCount,
          messages: [...chat.messages, ...messages]
        }
        return {
          ...state,
          byId: {
            ...state.byId,
            [contactId]: updatedChat
          }
        };
    }

    case UPDATE_CHAT_PAGINATION: {
      const { contactId } = action.payload;
      const { byId } = state;
      const chat = byId[contactId];
      return {
        ...state,
        byId: {
          ...state.byId,
          [contactId]: {
            ...chat,
            pagination: {
              start: chat.pagination.start +1,
              end: chat.pagination.end + 1,
            }
          }
        }
      }
    }

    case SET_TRANSFER_USERS: {
      const { transferUsers } = action.payload;
      return {
        ...state,
        transferUsers
      };
    }

    case TRANSFER_CONTACT: {
      const { contactId } = action.payload;
      const { byId, allIds } = state;
      const filteredAllIds = allIds.filter(id => id !== contactId) 
      delete byId[contactId];

      return {
        ...state,
        byId,
        allIds: filteredAllIds
      }
    }

    case SET_RECENT_CHATS: {
      const { byId, allIds } = action.payload;
      return {
        ...state,
        byId,
        allIds
      };
    }

    case OPEN_TRANSFER_LIST_DIALOG: {
      return {
        ...state,
        openTransferList: true
      };
    }

    case CLOSE_TRANSFER_LIST_DIALOG: {
      return {
        ...state,
        openTransferList: false
      }
    }
    
    case SET_CURRENT_CHAT_ROOM: {
      return {
        ...state, currentChatRoom: action.payload.currentChatRoom
      }
    }

    default: { return state; }
  }
}

export default ChatReducer;
