import io from 'socket.io-client';

export default function () {
  const host = process.env.REACT_APP_HOST_WS || 'http://localhost:3001/'
  console.log('host ws:', host);
  const token = localStorage.getItem('jwt_token');
  if (!token) {
    console.log('no token provided to socket connection');
    return;
  }
  const socket = io.connect(`${host}chat`, { 
    query: `auth_token=${token}`,
    reconnection: true,             // whether to reconnect automatically
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,        // how long to initially wait before attempting a new reconnection
    reconnectionDelayMax: 5000,
  });

  function registerMessageHandler(onMessageReceived) {
    socket.on('message', onMessageReceived)
  }

  function registerQrcodeHandler(onQrcode) {
    socket.on('qrcode', onQrcode)
  }

  function requestContactMessages(contactId) {
    socket.emit('getContactMessages', { contactId });
  }

  function registerReceiveContactMessages(onMessagesReceive) {
    socket.on('getContactMessages', onMessagesReceive);
  }

  function registerChatHandler(onReceiveChats, onReceiveChat) {
    socket.on('chats', onReceiveChats);
    socket.on('chat', onReceiveChat);
  }

  function registerContactsHandler(onReceiveCOntacts) {
    socket.on('contacts', onReceiveCOntacts);
  }

  function registerConnectHandler(onConnect) {
    socket.on('connect', onConnect);
  }

  function registerTransferUsers(onTransferUsers) {
    socket.on('transferUsers', onTransferUsers);
  }

  function registerTransferContact(onReceiveContact) {
    socket.on('transferContact', onReceiveContact);
  }

  function transferContact(data) {
    socket.emit('transfer', data);
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

  function saveContact(data) {
    socket.emit('saveContact', data);
  }

  function join(chatroomName, cb) {
    socket.emit('join', chatroomName, cb)
  }

  function leave(chatroomName, cb) {
    socket.emit('leave', chatroomName, cb)
  }

  function sendMessage(messageObject) {
    socket.emit('message', messageObject);
  }

  function getChatrooms(cb) {
    socket.emit('chatrooms', null, cb)
  }

  function getAvailableUsers(cb) {
    socket.emit('availableUsers', null, cb)
  }

  function close() {
    console.log('close chat socket connection');
    socket.close();
  }

  function disconnect() {
    console.log('[chat-socket] disconnected');
    socket.disconnect();
  }

  return {
    register,
    close,
    disconnect,
    join,
    leave,
    sendMessage,
    getChatrooms,
    getAvailableUsers,
    registerMessageHandler,
    unregisterHandler,
    registerConnectHandler,
    registerQrcodeHandler,
    registerReceiveContactMessages,
    registerChatHandler,
    requestContactMessages,
    registerContactsHandler,
    registerTransferUsers,
    transferContact,
    registerTransferContact,
    saveContact
  }
}