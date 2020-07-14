import {
  ADD_MESSAGE,
  SET_FETCHED_MESSAGE,
  SET_MESSAGES,
  GET_MESSAGES_SUCCESS,
  LOAD_FIRST_MESSAGES,
} from '../actions/MessageActions';

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

const defaultPagination = {
  start: 0, end: 15
};

const defaultContact = {
  chat: { 
    messages: [],
    pagination: defaultPagination,
    hasMoreMessage: false,
    firstMessageLoad: false,
  }
};

const MessageReducer = function(state = initialState, action) {
  switch(action.type) {
    case GET_MESSAGES_SUCCESS: {
      const {
        messages: previousMessages,
        nextPagination,
        hasMoreMessage,
        messageCount,
        contactId } = action.payload;

        const { contacts } = state;

        const contact = contacts[contactId];

        const sortByLastDate = (a, b) => new Date(a.createdAt) - new Date(b.createdAt);
        const newMessages = [...previousMessages, ...contact.chat.messages];
        const newSortedMessages = newMessages.sort(sortByLastDate);
        
        return {
          ...state,
          contacts: {
            ...contacts,
            [contactId]: {
              ...contact,
              chat: {
                ...contact.chat,
                messages: newSortedMessages,
                pagination: nextPagination,
                hasMoreMessage,
                messageCount,
              }
            }
          },
          isFetching: false
        }
    }

    case ADD_MESSAGE: {
      const { contacts } = state;
      const { contactId, message } = action.payload;
      const contact = contacts[contactId] || defaultContact;
      
      const { chat: { messages, pagination } } = contact;
      const newMessages = [...messages, message];
      const updatedContact = {
        ...contact,
        active: true,
        chat: {
          ...contact.chat,
          messages: newMessages,
          pagination: {
            start: pagination.start + 1,
            end: pagination.end + 1,
          },
        }
      };
      return {
        ...state,
        contacts: {
          ...contacts, [contactId]: updatedContact
        }
      };
    }

    case LOAD_FIRST_MESSAGES: {
      const { contactId } = action.payload;
      const contact = state.contacts[contactId];
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [contactId]: {
            ...contact,
            chat: {
              ...contact.chat,
              firstMessageLoad: true,
            }
          }
        }
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
      const sortByLastDate = (a, b) => new Date(a.createdAt) - new Date(b.createdAt);
      const sortedMessages = messages.sort(sortByLastDate);
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [contactId]: { ...contact, chat: { messages: sortedMessages } }
        }
      };
    }

    default: { return state; }
  }
}

export default MessageReducer;
