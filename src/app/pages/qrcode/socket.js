
const io = require('socket.io-client')

export default function () {
  const host = process.env.REACT_APP_HOST_WS || 'http://localhost:3001/'
  console.log('host ws:', host);
  const token = localStorage.getItem('jwt_token');
  if (!token) {
    console.log('no token provided to socket connection');
    return;
  }
  const socket = io.connect(`${host}qrcode`, { query: `auth_token=${token}`, reconnection: false });

  function registerQrcodeHandler(onQrcode) {
    socket.on('qrcode', onQrcode)
  }

  function registerConnectionStatus(onReceiveConnectionStatus) {
    socket.on('qrcodeStatusConnection', onReceiveConnectionStatus);
  }

  function registerContactsHandler(onReceiveContacts) {
    socket.on('adm-contacts', onReceiveContacts);
  }

  function registerConnectHandler(onConnect) {
    socket.on('connect', onConnect);
  }

  function importContacts(contacts) {
    socket.emit('import-contacts', contacts);
  }

  socket.on('error', function (err) {
    console.log('received socket error:')
    console.log(err)
  })

  function close() {
    console.log('close qrcode socket connection');
    socket.close();
  }

  function disconnect() {
    console.log('[qrcode-socket] disconnected');

    removeQrcodeListener();
    socket.disconnect();
  }

  function removeQrcodeListener() {
    socket.off('qrcode');
  }

  return {
    registerConnectHandler,
    registerQrcodeHandler,
    registerContactsHandler,
    importContacts,
    registerConnectionStatus,
    close,
    disconnect
  }
}