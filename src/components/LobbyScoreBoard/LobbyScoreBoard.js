import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { object } from "prop-types"
import { decodeHTML } from "../../utilities"
import './LobbyScoreBoard.scss'

export const LobbyScoreBoard = ({totalStats}) => {
  console.log(totalStats)
  
  const previousGames = totalStats.map(game => {
    const incorrectAnswers = game.incorrect.map(incorrect => <p>{decodeHTML(incorrect.question)}<br></br> You answered: {decodeHTML(incorrect.answer)}</p>)
    const correctAnswers = game.correctQuestions.map(correct => <p>{decodeHTML(correct)}</p>)
    return <Disclosure>
      <Disclosure.Button>
        {game.correct + '/' + game.total}
        <ChevronDownIcon></ChevronDownIcon> 
      </Disclosure.Button>
      <Disclosure.Panel>
        <div className="lobby-questions">Correct Questions:
        {correctAnswers}
        </div>
        <div className="lobby-questions">Incorrect Questions:
        {incorrectAnswers}
        </div>
      </Disclosure.Panel>
    </Disclosure>
  })

  return (
    <div className="lobby-score">Previous Games: {previousGames}</div>
  )
}

LobbyScoreBoard.propTypes = {
  totalStats: object,
}