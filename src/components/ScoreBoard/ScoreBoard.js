import { decodeHTML } from '../../utilities'
import './ScoreBoard.scss'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon } from "@heroicons/react/solid";


export const ScoreBoard = ({question, score, gameScore}) => {
  console.log(gameScore)
  const incorrectAnswers = gameScore.incorrect.map(incorrect => <p>{decodeHTML(incorrect.question)}<br></br> You answered: {decodeHTML(incorrect.answer)}</p>)
  return <div className="score-board">ScoreBoard
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
  </div>
}