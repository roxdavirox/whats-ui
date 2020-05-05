const io = require('socket.io-client')

export default function () {
  const host = process.env.REACT_APP_HOST_WS || 'http://localhost:3001'
  console.log('host ws:', host);
  const socket = io.connect(host)

  function registerQrcodeHandler(onQrcode) {
    socket.on('qrcode', onQrcode)
  }

  function registerContactsHandler(onReceiveContacts) {
    socket.on('contacts', onReceiveContacts);
  }

  function registerConnectHandler(onConnect) {
    socket.on('connect', onConnect)
  }

  socket.on('error', function (err) {
    console.log('received socket error:')
    console.log(err)
  })

  return {
    registerConnectHandler,
    registerQrcodeHandler,
    registerContactsHandler
  }
}