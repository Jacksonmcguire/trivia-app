import { decodeHTML } from '../../utilities'
import { BiBadgeCheck, BiX } from 'react-icons/bi'
import './HostView.scss'
export const HostView = ({room, slideDeck, players}) => {
  const questions = <ul>{slideDeck && slideDeck.map(slide => {
    return <li>
      <p>{decodeHTML(slide.question)}</p>
      <i>{decodeHTML(slide.correct_answer)}</i>
    </li>
  })}</ul>

  const playerScores = <section>
    {players && players.map(player => {
      return <article className="player-card">
        <h4>{player.name}</h4>
        <div className="player-score">
        {player.correct}
        <BiBadgeCheck></BiBadgeCheck>
        </div>
        <div className="player-score">
        {player.incorrect}
        <BiX></BiX>
        </div>
      </article>
    })}
  </section>
  return (
    <section className="host">
      <h3>Questions</h3>
      {questions}
      <h3>Players</h3>
      {playerScores}
    </section>
  )
}