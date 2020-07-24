

import {
  ADD_MESSAGE,
  SET_FETCHED_MESSAGE,
  SET_MESSAGES,
  GET_MESSAGES_SUCCESS,
  LOAD_FIRST_MESSAGES,
  UPDATE_DELETED_MESSAGE
} from '../actions/MessageActions';

const initialState = {
  isFetching: false,
  byId: {},
  allIds: []
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
        byId,
        allIds, } = action.payload;
        
        return {
          ...state,
          byId: {
            ...state.byId,
            ...byId
          },
          allIds: [...state.allIds, ...allIds]
        }
    }

    case ADD_MESSAGE: {
      const { message } = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [message.key.id]: message
        },
        allIds: [...state.allIds, message.key.id]
      };
    }

    case UPDATE_DELETED_MESSAGE: {
      const { messageId } = action.payload;
      const selectedMessage = state.byId[messageId];
      const updatedMessage = {
        ...selectedMessage,
        deleted: true,
      };
      return {
        ...state,
        byId: {
          ...state.byId,
          [messageId]: updatedMessage
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
