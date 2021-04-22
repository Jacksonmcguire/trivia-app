import { Link } from 'react-router-dom';
import './EndSlide.scss';
export const EndSlide = ({slides, score}) => {
  return (
    <form className="current-q">
      <h3>You Scored {score + '/' + slides.length}</h3>
      <Link to="/">Back to Lobby</Link>
    </form>
  )
}