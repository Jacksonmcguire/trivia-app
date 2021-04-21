import { QuestionSlide } from '../QuestionSlide/QuestionSlide'
import { ScoreBoard } from '../ScoreBoard/ScoreBoard'
import {GrPrevious , GrNext} from 'react-icons/gr'
import './InGame.scss'
export const InGame = () => {
  return (
    <main className="in-game">
      <GrPrevious></GrPrevious>
      <QuestionSlide></QuestionSlide>
      <GrNext></GrNext>
      <ScoreBoard/>
    </main>
  )
}