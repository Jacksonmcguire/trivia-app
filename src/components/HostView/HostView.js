import { decodeHTML } from '../../utilities'
import { BiBadgeCheck, BiX } from 'react-icons/bi'
import './HostView.scss'
export const HostView = ({room, slideDeck, players}) => {
  const questions = <ul className="questions"><h3>Questions</h3>
  {slideDeck && slideDeck.map((slide, index) => {
    return <li>
      <p>{index + 1}</p>
      <p>{decodeHTML(slide.question)}</p>
      <p>{decodeHTML(slide.correct_answer)}</p>
    </li>
  })}</ul>

  const playerScores = <section className="players"><h3>Players</h3>
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
  return (
    <section className="host">
      <div>

        {questions}
      </div>
      <div>Players

      {playerScores}
      </div>
    </section>
  )
}