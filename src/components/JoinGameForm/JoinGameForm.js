import './JoinGame.scss'
export const JoinGameForm = () => {
  return (
    <form>
      <div className="join-game">Join Game
      <input placeholder="Room Number"/>
      <input placeholder="Username"/>
      <button>Join</button>
    </div>
    </form>
  )
}