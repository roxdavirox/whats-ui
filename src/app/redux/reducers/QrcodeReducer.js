
import { SET_QRCODE, SET_CONNECTION_STATUS } from '../actions/QrcodeActions';

const initialState = {
  code: null,
  isConnected: false,
};

const QrcodeReducer = function(state = initialState, action) {
  switch(action.type) {
    case SET_QRCODE: {
      const { code } = action.payload;
      return {
        ...state,
        code
      };
    }

    case SET_CONNECTION_STATUS: {
      const { isConnected } = action.payload;
      return {
        ...state,
        isConnected
      };
    }

    default: {
      return state;
    }
  }
}

export default QrcodeReducer;
