import { Link } from 'react-router-dom';
import { BiBadgeCheck, BiX } from 'react-icons/bi';
import './EndSlide.scss';
export const EndSlide = ({ score, leaveRoom}) => {
  console.log(score)
  const playerScores = score.players.map(player => {
    return (
      <article className="player-card">
        <h4>{player.name}</h4>
        <section className="player-scores">
          <div className="player-score">
          {player.correct}
          <BiBadgeCheck></BiBadgeCheck>
          </div>
          <div className="player-score">
          {player.incorrect}
          <BiX></BiX>
          </div>
        </section>
      </article>
    )
  })

  return (
    <form className="current-q">
      {playerScores}
      {/* <h3>You Scored {score + '/' + slideCards.length}</h3> */}
      <Link to="/" onClick={leaveRoom}>Back to Lobby</Link>
    </form>
  )
}