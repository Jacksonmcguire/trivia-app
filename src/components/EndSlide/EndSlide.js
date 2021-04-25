import { array, func, number } from 'prop-types';
import { Link } from 'react-router-dom';
import './EndSlide.scss';
export const EndSlide = ({slides, score, newRound, endGame}) => {

  const startNewRound = (e) => {
    e.preventDefault()
    newRound()
  }

  const returnToLobby = () => {
    endGame()
  }

  return (
    <form className="current-q end-slide">
      <h3>You Scored {score + '/' + slides.length}</h3>
      <Link to="/" onClick={returnToLobby}>Back to Lobby</Link>
      <button onClick={startNewRound}>Play another Round</button>
    </form>
  )
}

EndSlide.propTypes = {
  slides: array.isRequired, 
  score: number.isRequired, 
  newRound: func.isRequired, 
  endGame: func.isRequired
}