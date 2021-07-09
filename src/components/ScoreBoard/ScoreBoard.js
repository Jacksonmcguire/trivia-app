import { decodeHTML } from '../../utilities'
import './ScoreBoard.scss'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from "@heroicons/react/solid";
import { number, object } from 'prop-types'
import { Link } from 'react-router-dom';

export const ScoreBoard = ({question, score, gameScore}) => {
  const incorrectAnswers = 
  gameScore && gameScore.incorrect.map(incorrect => <p key={incorrect.answer}>
    {decodeHTML(incorrect.question)}<br></br> You answered: {decodeHTML(incorrect.answer)}</p>)
  return !gameScore ? <h1>Scoreboard</h1> : (
    <div className="score-board">ScoreBoard
      <h3>Current Round: {score + '/' + question}</h3>
      <h3>This Session: {(gameScore.correct + '/' + gameScore.total)}</h3>
      <Disclosure>
        <Disclosure.Button>
          incorrect Questions
          <ChevronDownIcon></ChevronDownIcon>
        </Disclosure.Button>
        <Disclosure.Panel>
          {incorrectAnswers}
        </Disclosure.Panel>
      </Disclosure>
      <Link to='/'>Abandon Round...</Link>
    </div>
  )
}
ScoreBoard.propTypes = {
  question: number.isRequired,
  score: number.isRequired,
  gameScore: object.isRequired
}