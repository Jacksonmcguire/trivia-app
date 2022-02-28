import { decodeHTML } from '../../utilities'
import { BiBadgeCheck, BiX } from 'react-icons/bi'
import { Chat } from '../Chat/Chat'
import './HostView.scss'
export const HostView = ({room, slideDeck, players, socket, endGame, currentQuestion, newRound}) => {

  const sortedPlayers = players && players.sort((a, b) => b.correct - a.correct)

  const currentQ = () => {
    
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
        </p>
          <i>{answer}</i>
        <button onClick={nextQuestion}>Next Question</button>
      </div>
    ) 
  }

  const nextQuestion = () => {
    socket.emit('next question', room)
  } 

  const playerScores = 
  <table className="players">
    <tr>
      <th>Name</th>
      <th>Ready</th>
      <th><BiBadgeCheck></BiBadgeCheck></th>
      <th><BiX></BiX></th>
    </tr>
    {players && sortedPlayers.map(player => {
      const readyOrNot = () => {
        if (player.correct + player.incorrect < currentQuestion + 1) {
          return "No"
        } else return "Yes"
      }
      return <tr className>
        <td>{player.name}</td>
        <td>{readyOrNot()}</td>
        <td>{player.correct}</td>
        <td>{player.incorrect}</td>
      </tr>
    })}
  </table>

  return (
    <section className="host-container">
      <p className="end-game"><BiX  onClick={endGame}></BiX> End Game</p>
    <section className="host">
      {playerScores}
      {currentQ()}
    </section>
      <Chat room={room} socket={socket}></Chat>
    </section>
  )
}