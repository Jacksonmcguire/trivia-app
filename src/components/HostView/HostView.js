import { decodeHTML } from '../../utilities'
import { BiBadgeCheck, BiX } from 'react-icons/bi'
import { Chat } from '../Chat/Chat'
import './HostView.scss'
export const HostView = ({room, slideDeck, players, socket, endGame, currentQuestion, newRound}) => {

  const sortedPlayers = players && players.sort((a, b) => b.correct - a.correct)

  const currentQ = () => {
    const playerAnswers = players && players.map(player => {
      if (player.correct + player.incorrect < currentQuestion + 1) {
        return <p><BiX/>{player.name} is Not Ready</p>
      } else return <p><BiBadgeCheck/>{player.name} is Ready</p>
    })
    let question = ''
    let answer = ''
    slideDeck && console.log(slideDeck[currentQuestion])
    if (slideDeck && slideDeck[currentQuestion]) {
      question = decodeHTML(slideDeck[currentQuestion].question)
      answer = decodeHTML(slideDeck[currentQuestion].correct_answer)
    }
    if (slideDeck && slideDeck.length === currentQuestion) {
      return <div className="current-question"><button onClick={newRound}>Start a new round with the same filters</button></div>
    }
    return (
        <div className="current-question">
        <p>
          {question}
          <i>{answer}</i>
        </p>
        <p className="ready-or-not">
        {playerAnswers}
        </p>
        <button onClick={nextQuestion}>Next Question</button>
      </div>
    ) 
  }

  const nextQuestion = () => {
    socket.emit('next question', room)
  } 

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
    <section className="host-container">
      <p className="end-game"><BiX  onClick={endGame}></BiX> End Game</p>

    <section className="host">

        {currentQ()}

      <Chat room={room} socket={socket} className="host-chat"></Chat>
        {playerScores}

    </section>
    </section>
  )
}