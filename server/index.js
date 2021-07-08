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

  console.log('connection')

  socket.on('message', ({name, message}) => {
    io.emit('message', {name, message})
  })

  socket.on('create game', (roomName) => {
    socket.join(roomName)
    console.log(roomName)
    manager.newGame(roomName, socket.id)
    // console.log(manager)
    io.to(roomName).emit('new game', roomName)
    // console.log(manager)
  })

  socket.on('submit slides', ({slideDeck, room}) => {
    // console.log('room:' + room)
    let game = manager.games.findIndex(game => game.room === room)
    // console.log('game' + game)
    manager.games[game].setSlides(slideDeck)
    io.emit('add game', manager)

    // io.to(room).emit('slides submitted', manager)
  })

  socket.on('join game', ({room, name}) => {
    // console.log(name, 'joined', room)
    socket.join(room)
    // if (manager.room === room) 
    let game = manager.games.findIndex(game => game.room === room)
    // console.log(game)
    game > -1 && manager.games[game].playerJoin({name: name, id: socket.id})
    io.to(room).emit('new player', { slides: manager.games[game].slideDeck, manager: manager, room: room})
  })
  

  socket.on('correct answer', (room) => {
    let game = manager.games.findIndex(game => game.room === room)

    // manager.games.find(game => game.room === room)
    // console.log(socket.room)
    // console.log('correct', answer)
    
    manager.games[game].answerQuestion(socket.id, true)
    console.log(manager.games[game].players)
  })

  socket.on('wrong answer', (room) => {
    let game = manager.games.findIndex(game => game.room === room)

    // manager.games.find(game => game.room === room)
    // console.log('correct', answer)
    
    manager.games[game].answerQuestion(socket.id, false)
    console.log(manager.games[game].players)
    io.emit('update score', manager)
  })
})

http.listen(4000, () => console.log('listening on port 4000'))
