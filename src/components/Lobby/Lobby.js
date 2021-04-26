import { func } from 'prop-types'
import { useEffect, useState } from 'react'
import { getCategories } from '../../apiCalls'
import { LobbyScoreBoard } from '../LobbyScoreBoard/LobbyScoreBoard'
import { NewGameForm } from '../NewGameForm/NewGameForm'
import './Lobby.scss'

export const Lobby = ({generateSlideDeck, totalStats}) => {
  
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (!categories.length) {
      getCategories()
      .then(data => setCategories(data.trivia_categories))
    }
  })

    

  return (
    <main className="lobby">
      <NewGameForm categories={categories} generateSlideDeck={generateSlideDeck}/>
      <LobbyScoreBoard totalStats={totalStats}></LobbyScoreBoard>
    </main>
  )
}

Lobby.propTypes = {
  generateSlideDeck: func.isRequired,
}