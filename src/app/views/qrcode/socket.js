const io = require('socket.io-client')

export default function () {
  const host = process.env.REACT_APP_HOST_WS || 'http://localhost:3001'
  console.log('host ws:', host);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.1iEUBd6EOj0xeNCvbczF_te1Ac6EdrNU641Tc3gB4Qs';
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