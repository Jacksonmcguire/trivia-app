import {socket} from '../App/App'
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './JoinGame.scss'
export const JoinGameForm = () => {

  const [room, setRoom] = useState()
  const [name, setName] = useState()

  useEffect(() => {
    socket.on('join game')
  })

  const joinGame = (e) => {
    // e.preventDefault();
    socket.emit('join game', {room, name})
  }

  const textChange = (e, stateMethod) => {
    stateMethod(e.target.value)
  }

  return (
    <form onSubmit={joinGame}>
      <div className="join-game">Join Game
      <input placeholder="Room" value={room} onChange={e => textChange(e, setRoom)}/>
      <input placeholder="Username" value={name} onChange={e => textChange(e, setName)}/>
      <Link to="/play" onClick={joinGame}>
        <button>Join</button>
      </Link>
    </div>
    </form>
  )
}