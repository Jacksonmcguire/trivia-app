import { array, func } from 'prop-types'
import { useEffect, useState } from 'react'
import { getCategories } from '../../apiCalls'
import { LobbyScoreBoard } from '../LobbyScoreBoard/LobbyScoreBoard'
import { NewGameForm } from '../NewGameForm/NewGameForm'
import './Lobby.scss'

export const Lobby = ({generateSlideDeck, totalStats, clearHistory}) => {
  
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (!categories.length) {
      getCategories()
      .then(data => setCategories(data.trivia_categories))
    }
  })

  return (
    <main className="lobby">
      {categories.length === 0 && <p className="error-msg">Sorry we are having issues with our server. Try again later.</p>}
      <NewGameForm categories={categories} generateSlideDeck={generateSlideDeck}/>
      <LobbyScoreBoard totalStats={totalStats} clearHistory={clearHistory}></LobbyScoreBoard>
    </main>
  )
}

Lobby.propTypes = {
  generateSlideDeck: func.isRequired,
  totalStats: array.isRequired,
  clearHistory: func.isRequired
}