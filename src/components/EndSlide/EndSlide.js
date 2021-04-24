import { Link } from 'react-router-dom';
import './EndSlide.scss';
export const EndSlide = ({slides, score, newRound}) => {

  const startNewRound = (e) => {
    e.preventDefault()
    newRound()
  }

  return (
    <form className="current-q end-slide">
      <h3>You Scored {score + '/' + slides.length}</h3>
      <Link to="/">Back to Lobby</Link>
      <button onClick={startNewRound}>Play another Round</button>
    </form>
  )
}