import './App.scss';
import { Lobby } from '../Lobby/Lobby'
import { InGame } from '../InGame/InGame'
import { Route, Switch } from 'react-router-dom'
import { getChosenDeck } from '../../apiCalls'
import React from 'react';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      activeSlides: [],
      activeSearch: '',
      gameScore: {correct: 0, total: 0, incorrect: [], correctQuestions: []},
      totalStats: []
    }
  }

  componentDidMount() {
    const scores = JSON.parse(localStorage.getItem('scores'))
    this.setState({...this.state, totalStats: (scores || [])})
    console.log((scores))
  }

  generateSlideDeck = (str) => {
    getChosenDeck(str)
    .then(data => {
      this.setState({activeSlides: data.results, activeSearch: str})
    })
  }  

  startNewRound = ({correct, length, incorrect, correctAnswers}) => {
    this.endRound(correct, length, incorrect, correctAnswers)
    this.generateSlideDeck(this.state.activeSearch)
    console.log(JSON.parse(localStorage.getItem('scores')))
  }

  endRound = (correct, length, incorrect, correctAnswers) => {
    this.setState({...this.state, gameScore: {
      correct: this.state.gameScore.correct + correct,
      total: this.state.gameScore.total + length, 
      incorrect: [...this.state.gameScore.incorrect, ...incorrect],
      correctQuestions: [...this.state.gameScore.correctQuestions, ...correctAnswers]
  }
  })
  console.log(this.state.gameScore, correct, length, incorrect, correctAnswers)
  localStorage.setItem('scores', JSON.stringify([...this.state.totalStats, this.state.gameScore]))

  }

  endGame = ({correct, length, incorrect, correctAnswers}) => {
    console.log(correct, length, incorrect, correctAnswers)
    this.endRound(correct, length, incorrect, correctAnswers)

  }

  render() {
    return (
      <div className="App">
        <header>Trivia App</header>
        <Switch>
        <Route exact path='/'>
          <Lobby generateSlideDeck={this.generateSlideDeck}/>
        </Route>
        <Route exact path='/play'>
          <InGame 
          slides={this.state.activeSlides} 
          startNewRound={this.startNewRound}
          gameStats={this.state.gameScore}
          endGame={this.endGame}
          />
        </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
