const io = require('socket.io-client')

export default function () {
  const host = process.env.REACT_APP_HOST_WS || 'http://localhost:3001'
  console.log('host ws:', host);
  const socket = io.connect(host)

  function registerQrcodeHandler(onQrcode) {
    socket.on('qrcode', onQrcode)
  }

  function registerConnectHandler(onConnect) {
    socket.on('connect', onConnect)
  }

  socket.on('error', function (err) {
    console.log('received socket error:')
    console.log(err)
  })

  function register(name, cb) {
    socket.emit('register', name, cb)
  }

  return {
    register,
    registerConnectHandler,
    registerQrcodeHandler,
  }
}