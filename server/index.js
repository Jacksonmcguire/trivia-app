const GameManager = require('./gameManager')
const app = require('express')
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
  }
})
let manager = new GameManager()


io.on('connection', socket => {
  socket.on('message', ({name, message}) => {
    io.emit('message', {name, message})
  })

  socket.on('create game', (roomName) => {
    socket.join(roomName)
    manager.newGame(roomName, socket.id)
    io.to(roomName).emit('new game', {room: roomName, host: socket.id})
  })

  socket.on('submit slides', ({slideDeck, room}) => {
    let game = manager.games.findIndex(game => game.room === room)
    manager.games[game].setSlides(slideDeck)
    io.emit('add game', manager)

  })

  socket.on('join game', ({room, name}) => {
    socket.join(room)
    let game = manager.games.findIndex(game => game.room === room)
    game > -1 && manager.games[game].playerJoin({name: name, id: socket.id})
    io.to(room).emit('new player', { slides: manager.games[game].slideDeck, manager: manager, room: room})
  })
  

  socket.on('correct answer', (room) => {
    let game = manager.games.findIndex(game => game.room === room)    
    manager.games[game].answerQuestion(socket.id, true)
    console.log(manager.games[game].players)
    io.emit('update score', manager)
  })

  socket.on('wrong answer', (room) => {
    let game = manager.games.findIndex(game => game.room === room)
    manager.games[game].answerQuestion(socket.id, false)
    io.emit('update score', manager)
  })
})

http.listen(4000, () => console.log('listening on port 4000'))
