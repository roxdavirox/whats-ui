import { 
  OPEN_SAVE_CONTACT_DIALOG,
  CLOSE_SAVE_CONTACT_DIALOG,
  ADD_RECENT_CHAT,
  ADD_MESSAGE,
  SET_TRANSFER_USERS,
  SET_RECENT_CHATS,
  SET_CONTACTS,
  ADD_CONTACT,
  CLOSE_CONTACT_LIST_DIALOG,
  OPEN_TRANSFER_LIST_DIALOG,
  CLOSE_TRANSFER_LIST_DIALOG,
  SET_FETCHED_MESSAGE,
  SET_MESSAGES,
  SET_CONTACT_ID,
  SET_CURRENT_CHAT_ROOM,
} from '../actions/ChatActions';
import localStorageService from '../../services/localStorageService';
// um contato é responsavel por
// armazenar o chat com suas mensagens como embed docs

const initialState = {
  currentUser: localStorageService.getItem('auth_user'),
  openContactListDialog: false,
  openTransferListDialog: false,
  openSaveContactDialog: false,
  transferUsers: [],
  contacts: {},
  recentChats: [],
  contactId: '',
  fetchedMessages: {},
  currentChatRoom: '',
  scroll: null,
};

const ChatReducer = function(state = initialState, action) {
  switch(action.type) {
    case OPEN_SAVE_CONTACT_DIALOG: {
      return {
        ...state,
        openSaveContact: true
      };
    }

    case CLOSE_SAVE_CONTACT_DIALOG: {
      return {
        ...state,
        openSaveContact: false
      };
    }
    
    case ADD_RECENT_CHAT: {
      const { recentChat } = action.payload;
      return {
        ...state,
        recentChats: [...state.recentChats, recentChat]
      };
    }

    case ADD_MESSAGE: {
      const defaultContact = { chat: { messages: []} };
      const { contacts } = state;
      const { contactId, message } = action.payload;
      const contact = contacts[contactId] || defaultContact;
      
      const { chat: { messages } } = contact;
      const newMessages = [...messages, message];
      const updatedContact = {
        ...contact,
        chat: {
          ...contact.chat,
          messages: newMessages
        }
      };
      return {
        ...state,
        contacts: {
          ...contacts, [contactId]: updatedContact
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
      return {
        ...state,
        recentChats
      };
    }

    case SET_CONTACTS: {
      const { contacts } = action.payload;
      return {
        ...state,
        contacts
      };
    }

    case ADD_CONTACT: {
      const { contact } = action.payload;
      const { id } = contact;
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [id]: contact
        }
      };
    }

    case CLOSE_CONTACT_LIST_DIALOG: {
      return {
        ...state,
        openContactList: false
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

    case SET_FETCHED_MESSAGE: {
      const { contactId } = action.payload;
      return {
        ...state,
        fetchedMessages: {
          ...state.fetchedMessages,
          [contactId]: { fetched: true }
        }
      };
    }

    case SET_MESSAGES: {
      const { messages, contactId } = action.payload;
      const contact = state.contacts[contactId];
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [contactId]: { ...contact, chat: { messages } }
        }
      };
    }
    
    case SET_CONTACT_ID: {
      return {
        ...state, contactId: action.payload.contactId
      };
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
