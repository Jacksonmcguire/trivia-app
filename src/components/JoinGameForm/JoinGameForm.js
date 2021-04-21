import './JoinGame.scss'
export const JoinGameForm = () => {
  return (
    <div className="join-game">Join Game
      <input placeholder="Room Number"/>
      <input placeholder="Username"/>
      <button>Join</button>
    </div>
  )
}