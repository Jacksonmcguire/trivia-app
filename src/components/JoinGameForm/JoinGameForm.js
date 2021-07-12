import {socket} from '../App/App'
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './JoinGame.scss'
export const JoinGameForm = ({name}) => {

  const [room, setRoom] = useState()

  useEffect(() => {
    socket.on('join game')
  })

  const joinGame = (e) => {
    socket.emit('join game', {room: room, name: name})
  }

  const textChange = (e, stateMethod) => {
    stateMethod(e.target.value)
  }

  return (
    <form onSubmit={joinGame}>
      <div className="join-game">
      <input placeholder="Room" value={room} onChange={e => textChange(e, setRoom)}/>
      <Link to="/play" onClick={joinGame}>
        <button>Join</button>
      </Link>
    </div>
    </form>
  )
}