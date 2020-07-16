
import {
  OPEN_SAVE_CONTACT_DIALOG,
  CLOSE_SAVE_CONTACT_DIALOG,
  SET_CONTACTS,
  ADD_CONTACT,
  CLOSE_CONTACT_LIST_DIALOG,
  SET_CONTACT_ID,
  SAVE_CONTACT,
  TRANSFER_CONTACT,
  SET_RECEIVED_CONTACT,
  OPEN_CONTACT_LIST,
  OPEN_ADD_CONTACT_DIALOG,
  CLOSE_ADD_CONTACT_DIALOG,
  FINISH_CONTACT
} from '../actions/ContactActions';

const initialState = {
  isContactListOpen: false,
  openTransferListDialog: false,
  openSaveContact: false,
  transferUsers: [],
  recentChats: [],
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

const defaultPagination = {
  start: 0, end: 15
};

const ContactReducer = function(state = initialState, action) {
  switch(action.type) {
    case OPEN_SAVE_CONTACT_DIALOG: {
      return {
        ...state,
        openSaveContact: true,
      };
    }

    case OPEN_ADD_CONTACT_DIALOG: {
      return {
        ...state,
        openAddContact: true,
      };
    }

    case CLOSE_ADD_CONTACT_DIALOG: {
      return {
        ...state,
        openAddContact: false,
      };
    }

    case OPEN_CONTACT_LIST: {
      return {
        ...state,
        isContactListOpen: true
      }
    }

    case CLOSE_SAVE_CONTACT_DIALOG: {
      return {
        ...state,
        openSaveContact: false
      };
    }

    case SET_RECEIVED_CONTACT: {
      const { chat, contact } = action.payload;
      const { contacts, recentChats } = state;
      const receivedChat = {
        id: chat.id,
        lastMessageTime: chat.lastMessageTime,
        contactId: contact.id, 
        userId: contact.userId, 
        ownerId: contact.ownerId,
        contact: {
          ...contact,
          eurl: 'assets/faces/default-avatar.pngj',
        }
      };
      
      return { 
        ...state,
        contacts: { 
          ...contacts, 
          [contact.id]: {
            ...contact, 
            chat: {
              messages: [],
              pagination: defaultPagination
            }
          }
        },
        recentChats: [...recentChats, receivedChat]
      }
    }

    case TRANSFER_CONTACT: {
      const { recentChats, contacts, contactId, fetchedMessages } = state;
      const filteredRecentChats = recentChats
        .filter(recentChat => recentChat.contactId !== contactId);

      delete contacts[contactId];
      delete fetchedMessages[contactId];

      return {
        ...state,
        contacts,
        recentChats: filteredRecentChats,
        fetchedMessages
      }
    }
    
    case SET_CONTACTS: {
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

    case ADD_CONTACT: {
      const { contact } = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [contact.id]: contact
        },
        allIds: [...state.allIds, contact.id]
      };
    }

    case FINISH_CONTACT: {
      const { contactId } = action.payload;
      const { contacts } = state;

      const contact = contacts[contactId];

      return {
        ...state,
        contacts: {
          ...contacts,
          [contactId]: {
            ...contact,
            active: false,
          },
        }
      }
    }

    case CLOSE_CONTACT_LIST_DIALOG: {
      return {
        ...state,
        isContactListOpen: false
      };
    }

    case SET_CONTACT_ID: {
      return {
        ...state, contactId: action.payload.contactId
      };
    }

    case SAVE_CONTACT: {
      const { name } = action.payload;
      const { contactId, contacts } = state;
   
      const contact = contacts[contactId];

      return {
        ...state,
        contacts: {
          ...contacts,
          [contactId]: {
            ...contact,
            name,
            short: name
          }
        },
      }
    }

    default: {
      return state;
    }
  }
}

export default ContactReducer;
