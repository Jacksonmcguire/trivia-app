import './App.scss';
import { Lobby } from '../Lobby/Lobby'
import { InGame } from '../InGame/InGame'
import { Route, Switch } from 'react-router-dom'
import { getChosenDeck } from '../../apiCalls'
import React, { useEffect, useState } from 'react';

const App = () => {
  const [activeSlides, setActiveSlides] = useState([])
  const [activeSearch, setActiveSearch] = useState('')
  const [gameScore, setGameScore] = useState({correct: 0, total: 0, incorrect: [], correctQuestions: []})
  const [totalStats, setTotalStats] = useState([])



  useEffect(() => {
    if (!totalStats.length) {
      const scores = JSON.parse(localStorage.getItem('scores'))
      setTotalStats(scores || [])
    }
  }, [])

  useEffect(() => {
    if (gameScore.total > 0) {
      localStorage.setItem('scores', JSON.stringify([...totalStats, gameScore]))
    }
  }, [gameScore, totalStats])

  const generateSlideDeck = (str) => {
    getChosenDeck(str)
    .then(data => {
      setActiveSearch(str)
      setActiveSlides(data.results)
    })
  }  

  const startNewRound = ({correct, length, incorrect, correctAnswers}) => {
    endRound(correct, length, incorrect, correctAnswers)
    generateSlideDeck(activeSearch)
  }

  const endRound = (correct, length, incorrect, correctAnswers) => {
    setGameScore({
      correct: Number(gameScore.correct + correct),
      total: Number(gameScore.total + length), 
      incorrect: [...gameScore.incorrect, ...incorrect],
      correctQuestions: [...gameScore.correctQuestions, ...correctAnswers]
  })
  
}

  const endGame = ({correct, length, incorrect, correctAnswers}) => {
    endRound(correct, length, incorrect, correctAnswers)
  }



  
    return (
      <div className="App">
        <header>Trivia App</header>
        <Switch>
        <Route exact path='/'>
          <Lobby 
          generateSlideDeck={generateSlideDeck}
          totalStats={totalStats}/>
        </Route>
        <Route exact path='/play'>
          <InGame 
          slides={activeSlides} 
          startNewRound={startNewRound}
          gameStats={gameScore}
          endGame={endGame}
          />
        </Route>
        </Switch>
      </div>
    );
}

export default App;
