import { decodeHTML } from '../../utilities'
import { BiBadgeCheck, BiX } from 'react-icons/bi'
import { Chat } from '../Chat/Chat'
import './HostView.scss'
export const HostView = ({room, slideDeck, players, socket, endGame, currentQuestion}) => {

  const sortedPlayers = players && players.sort((a, b) => b.correct - a.correct)
  console.log(sortedPlayers)
  const questions = <ul className="questions"><h3>Questions</h3>
  {slideDeck && slideDeck.map((slide, index) => {
    return <li key={slide.question}>
      <p>{index + 1}.</p>
      <p>{decodeHTML(slide.question)}</p>
      <p>{decodeHTML(slide.correct_answer)}</p>
    </li>
  })}</ul>

  const currentQ = () => {
    const playerAnswers = players && players.map(player => {
      if (player.correct + player.incorrect < currentQuestion + 1) {
        return <p>{player.name} has yet to answer the question</p>
      } else return <p>{player.name} has answered the question</p>
    })
    let question = ''
    slideDeck && console.log(slideDeck[currentQuestion])
    if (slideDeck && slideDeck[currentQuestion]) {
      question = decodeHTML(slideDeck[currentQuestion].question)
    }
    return (
        <div className="current-question">
        {question}
        {playerAnswers}
        <button onClick={nextQuestion}>Next Question</button>
      </div>
    ) 
  }

  const nextQuestion = () => {
    socket.emit('next question', room)
  }  // Iterate through players, for each, checking if they have as many correct and incorrect answers that would add up
  // the current question index val + 1
  // slideDeck[currentQuestion]

  const playerScores = <div><h3>Players</h3><section className="players">
    {players && sortedPlayers.map(player => {
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

        {currentQ()}
      <Chat room={room} socket={socket} className="host-chat"></Chat>

      {playerScores}
    </section>
  )
}