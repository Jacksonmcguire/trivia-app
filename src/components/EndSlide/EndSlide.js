import { Link } from 'react-router-dom';
import { BiBadgeCheck, BiX } from 'react-icons/bi';
import './EndSlide.scss';
const standings = [{class: "gold", str: '1st Place'}, {class: "silver", str: '2nd Place'}, {class: "bronze", str: '3rd Place'}]
export const EndSlide = ({ score, leaveRoom}) => {

  const sortedPlayers = score.players && score.players.sort((a, b) => b.correct - a.correct)

  const playerScores = sortedPlayers && <section className="player-board">{
    sortedPlayers.map((player, ind) => {
    return (
      <article className={`player-card ${standings[ind] && standings[ind].class}`}>{(standings[ind] && standings[ind].str)}
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
  })}
  </section>

  return (
    <form className="current-q score">
      {playerScores}
      <Link to="/" onClick={leaveRoom}>Back to Lobby</Link>
    </form>
  )
}