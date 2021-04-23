const app = require('express')
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
  }
})

io.on('connection', socket => {

  console.log('connection')
  socket.on('message', ({name, message}) => {
    io.emit('message', {name, message})
  })

  socket.on('create game', roomName => {
    socket.join(roomName)
    console.log(roomName)
    io.to(roomName).emit('new game', roomName)
  })
})

http.listen(4000, () => console.log('listening on port 4000'))