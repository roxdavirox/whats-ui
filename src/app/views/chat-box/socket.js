const io = require('socket.io-client')

export default function () {
  const host = process.env.REACT_APP_HOST_WS || 'http://localhost'
  console.log('host ws:', host);
  const socket = io.connect(`${host}:3001`)

  function registerHandler(onMessageReceived) {
    socket.on('message', onMessageReceived)
  }

  function registerQrcodeHandler(onQrcode) {
    socket.on('qrcode', onQrcode)
  }

  function registerChatHandler(onChats) {
    socket.on('chats', onChats);
  }

  function registerConnectHandler(onConnect) {
    socket.on('connect', onConnect)
  }

  function unregisterHandler() {
    socket.off('message')
  }

  socket.on('error', function (err) {
    console.log('received socket error:')
    console.log(err)
  })

  function register(name, cb) {
    socket.emit('register', name, cb)
  }

  function join(chatroomName, cb) {
    socket.emit('join', chatroomName, cb)
  }

  function leave(chatroomName, cb) {
    socket.emit('leave', chatroomName, cb)
  }

  function message(messageObject) {
    socket.emit('message', messageObject);
  }

  function getChatrooms(cb) {
    socket.emit('chatrooms', null, cb)
  }

  function getAvailableUsers(cb) {
    socket.emit('availableUsers', null, cb)
  }

  return {
    register,
    join,
    leave,
    message,
    getChatrooms,
    getAvailableUsers,
    registerHandler,
    unregisterHandler,
    registerConnectHandler,
    registerQrcodeHandler,
    registerChatHandler
  }
}