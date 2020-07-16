
import { normalize } from 'normalizr';
import { chatSchema } from '../schema';

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
  SET_CHAT_PAGINATION
} from '../actions/ChatActions';

const initialState = {
  isContactListOpen: false,
  openTransferListDialog: false,
  openSaveContact: false,
  transferUsers: [],
  contacts: {},
  recentChats: [],
  contactId: '',
  fetchedMessages: {},
  currentChatRoom: '',
  imageModalOpen: false,
  fileUrl: null,
  isFetching: false,
  openAddContact: false,
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
      const { contactId, lastMessageTime } = action.payload;
      const { recentChats } = state;
      const updatedRecentChats = recentChats.reduce((allRecentChats, crrRecentChat) => {
        if (crrRecentChat.contactId === contactId) {
          return [...allRecentChats, { ...crrRecentChat, lastMessageTime, active: true }]
        }
        return [...allRecentChats, crrRecentChat];
      }, []);
      return {
        ...state,
        recentChats: updatedRecentChats
      }
    }

    case SET_CHAT_PAGINATION: {
      const { 
        nextPagination,
        hasMoreMessage,
        messageCount,
        contactId } = action.payload;
        
        const chat = state.byId[contactId];
        const updatedChat = {
          ...chat,
          nextPagination,
          hasMoreMessage,
          messageCount,
        }
        return {
          ...state,
          byId: {
            ...state.byId,
            [contactId]: updatedChat
          }
        };
    }

    case SET_TRANSFER_USERS: {
      const { transferUsers } = action.payload;
      return {
        ...state,
        transferUsers
      };
    }

    case SET_RECENT_CHATS: {
      const { recentChats } = action.payload;
      const normalizedRecentChats = normalize(recentChats, [chatSchema]);
      const { entities, result } = normalizedRecentChats;
      return {
        ...state,
        byId: entities.chats,
        allIds: [...result]
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
