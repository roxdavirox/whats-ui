export const SET_QRCODE = 'SET_QRCODE';
export const SET_CONNECTION_STATUS = 'SET_CONNECTION_STATUS';

export const setQrcode = code => ({
  type: SET_QRCODE,
  payload: { code }
});

export const setConnectionStatus = isConnected => ({
  type: SET_CONNECTION_STATUS,
  payload: { isConnected }
});

