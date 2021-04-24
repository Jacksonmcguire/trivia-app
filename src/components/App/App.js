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
      gameScore: {correct: 0, total: 0, incorrect: [], correctQuestions: []}
    }
  }

  generateSlideDeck = (str) => {
    getChosenDeck(str)
    .then(data => {
      console.log(data)
      this.setState({activeSlides: data.results, activeSearch: str})
    })
  }  

  startNewRound = ({correct, length, incorrect, correctAnswers}) => {
    this.generateSlideDeck(this.state.activeSearch)
    
    this.setState({...this.state, gameScore: {
      correct: this.state.gameScore.correct + correct,
      total: this.state.gameScore.total + length, 
      incorrect: [...this.state.gameScore.incorrect, ...incorrect],
      correctQuestions: [...this.state.gameScore.correctQuestions, ...correctAnswers]
    }})
  }

  render() {
    return (
      <div className="App">
        <header>Trivia App</header>
        <Switch>
        <Route exact path='/'><Lobby generateSlideDeck={this.generateSlideDeck}/></Route>
        <Route exact path='/play'>
          <InGame 
          slides={this.state.activeSlides} 
          startNewRound={this.startNewRound}
          gameStats={this.state.gameScore}
          />
        </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
