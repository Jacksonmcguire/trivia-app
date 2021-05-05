import { Popover } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { array, func } from "prop-types"
import { Link } from "react-router-dom"
import { decodeHTML } from "../../utilities"
import './LobbyScoreBoard.scss'

export const LobbyScoreBoard = ({totalStats, clearHistory}) => {


  const previousGames = totalStats.map((game, index) => {
    const incorrectAnswers = game.incorrect.map((incorrect, index) => <p key={index}>{decodeHTML(incorrect.question)}<br></br> You answered: {decodeHTML(incorrect.answer)}</p>)
    const correctAnswers = game.correctQuestions.map((correct) => <p key={correct}>{decodeHTML(correct)}</p>)
    return <Popover key={index}>
      <Popover.Button>
        {game.category + ' ' + game.correct + '/' + game.total}
        <ChevronDownIcon></ChevronDownIcon> 
      </Popover.Button>
      <Popover.Panel>
        <div className="popover-panel">
        <div className="lobby-questions">Correct Questions:
        {correctAnswers}
        </div>
        <div className="lobby-questions">Incorrect Questions:
        {incorrectAnswers}
        </div>
        </div>
      </Popover.Panel>
    </Popover>
  })

  return (
    <div className="lobby-score">
      <Link to='/'>
      <button onClick={clearHistory}>Clear History</button>
      </Link>
      <h2>Previous Games:</h2>
      {previousGames}
    </div>
  )
}

LobbyScoreBoard.propTypes = {
  totalStats: array.isRequired,
  clearHistory: func.isRequired
}