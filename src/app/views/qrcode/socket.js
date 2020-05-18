
const io = require('socket.io-client')

export default function () {
  const host = process.env.REACT_APP_HOST_WS || 'http://localhost:3001/qrcode'
  console.log('host ws:', host);
  const token = localStorage.getItem('jwt_token');
  if (!token) {
    console.log('no token provided to socket connection');
    return;
  }
  const socket = io.connect(host, {query: `auth_token=${token}`});

  function registerQrcodeHandler(onQrcode) {
    socket.on('qrcode', onQrcode)
  }

  function registerContactsHandler(onReceiveContacts) {
    socket.on('adm-contacts', onReceiveContacts);
  }

  function registerConnectHandler(onConnect, userData) {
    socket.on('connect', onConnect);
    socket.emit('userdata', userData);
  }

  function importContacts(contacts) {
    socket.emit('import-contacts', contacts);
  }

  socket.on('error', function (err) {
    console.log('received socket error:')
    console.log(err)
  })

  return {
    registerConnectHandler,
    registerQrcodeHandler,
    registerContactsHandler,
    importContacts
  }
}