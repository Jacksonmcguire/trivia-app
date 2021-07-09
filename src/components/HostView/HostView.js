import { decodeHTML } from '../../utilities'
import { BiBadgeCheck, BiX } from 'react-icons/bi'
import { Chat } from '../Chat/Chat'
import './HostView.scss'
export const HostView = ({room, slideDeck, players, socket, endGame}) => {
  const questions = <ul className="questions"><h3>Questions</h3>
  {slideDeck && slideDeck.map((slide, index) => {
    return <li key={slide.question}>
      <p>{index + 1}.</p>
      <p>{decodeHTML(slide.question)}</p>
      <p>{decodeHTML(slide.correct_answer)}</p>
    </li>
  })}</ul>

  const playerScores = <div><h3>Players</h3><section className="players">
    {players && players.map(player => {
      return <article className="player-card">
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
    })}
  </section>
  </div>

  return (
    <section className="host">
      <BiX className="end-game" onClick={endGame}>End Game</BiX> 

        {questions}
      <Chat room={room} socket={socket} className="host-chat"></Chat>

      {playerScores}
    </section>
  )
}