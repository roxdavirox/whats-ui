
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
  UPDATE_CHAT_PAGINATION
} from '../actions/ChatActions';
import { LOAD_FIRST_MESSAGES } from '../actions/MessageActions';

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
  allIds: []
};

const ChatReducer = function(state = initialState, action) {
  switch(action.type) {

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
      const { recentChat } = action.payload;
      return {
        ...state,
        recentChats: [...state.recentChats, recentChat]
      };
    }

    case UPDATE_RECENT_CHAT: {
      const { contactId, lastMessageTime, messageId } = action.payload;
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
          nextPagination,
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

    case SET_RECENT_CHATS: {
      const { byId, allIds } = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          ...byId
        },
        allIds: [...state.allIds, ...allIds]
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
