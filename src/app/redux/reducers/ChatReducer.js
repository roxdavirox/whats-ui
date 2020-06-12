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
  SAVE_CONTACT,
  TRANSFER_CONTACT,
  SET_RECEIVED_CONTACT,
  UPDATE_RECENT_CHAT,
  OPEN_IMAGE_MODAL,
  CLOSE_IMAGE_MODAL
} from '../actions/ChatActions';

const initialState = {
  openContactListDialog: false,
  openTransferListDialog: false,
  openSaveContactDialog: false,
  transferUsers: [],
  contacts: {},
  recentChats: [],
  contactId: '',
  fetchedMessages: {},
  currentChatRoom: '',
  imageModalOpen: false,
  imageUrl: null
};

const ChatReducer = function(state = initialState, action) {
  switch(action.type) {
    case OPEN_SAVE_CONTACT_DIALOG: {
      return {
        ...state,
        openSaveContact: true,
      };
    }
    
    case OPEN_IMAGE_MODAL: {
      return {
        ...state,
        imageModalOpen: true,
        imageUrl: action.payload.url
      };
    }

    case CLOSE_IMAGE_MODAL: {
      return {
        ...state,
        imageModalOpen: false,
        imageUrl: null
       };
    }

    case SET_RECEIVED_CONTACT: {
      const { chat, contact } = action.payload;
      const { contacts, recentChats } = state;
      const receivedChat = {
        id: chat.id, 
        contactId: contact.id, 
        userId: contact.userId, 
        ownerId: contact.ownerId,
        contact: {
          ...contact,
          eurl: 'assets/faces/default-avatar.pngj',
          status: 'Online',
        }
      };
      return { 
        ...state,
        contactId: contact.id,
        contacts: { 
          ...contacts, 
          [contact.id]: { ...contact, chat: { messages: [] } }
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

    case UPDATE_RECENT_CHAT: {
      const { contactId, time } = action.payload;
      const { recentChats } = state;
      const updatedRecentChats = recentChats.reduce((allRecentChats, crrRecentChat) => {
        if (crrRecentChat.contactId === contactId) {
          return [...allRecentChats, { ...crrRecentChat, lastMessageTime: time }]
        }
        return [...allRecentChats, crrRecentChat];
      }, []);
      return {
        ...state,
        recentChats: updatedRecentChats
      }
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

    case SAVE_CONTACT: {
      const { name } = action.payload;
      const { contactId, contacts } = state;
   
      const contact = contacts[contactId];

      return {
        ...state,
        contacts: {
          ...contacts,
          [contactId]: {
            ...contact, name, short: name
          }
        },
      }
    }

    default: { return state; }
  }
}

export default ChatReducer;
