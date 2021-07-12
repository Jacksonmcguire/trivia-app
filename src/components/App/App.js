import './App.scss';
import { Lobby } from '../Lobby/Lobby'
import { InGame } from '../InGame/InGame'
import { Route, Switch } from 'react-router-dom'
import { getChosenDeck } from '../../apiCalls'
import React from 'react';
import io from "socket.io-client"
let backend = ("https://trivia-backend-multiplayer.herokuapp.com/") || "http://localhost:4000"

export const socket = io.connect(backend);
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      activeSlides: [],
      games: [],
      searchStr: ''
    }
  }

  updateGames = (games) => {
    if (this.state.games !== games) {
        
      this.setState({games: games})
    }
  }

  componentDidUpdate() {
    socket.on('add game', (manager) => {
      if (this.state.games !== manager.games) {
        
        this.setState({games: manager.games})
      }
      socket.on('update score', (manager) => {
        if (this.state.games !== manager.games) {
    
        this.setState({games: manager.games})
        }
      })
    })  
  }

  generateSlideDeck = async (str = this.state.searchStr, room) => {
      return await getChosenDeck(str)
      .then(data => {
        this.setState({activeSlides: data.results, searchStr: str})
        return data.results
      })
  } 
  
  render() {
    return (
      <div className="App">
        <header>Trivia App</header>
        <Switch>
        <Route exact path='/'><Lobby activeSlides={this.state.activeSlides} generateSlideDeck={this.generateSlideDeck} stats={this.state.games}/></Route>
        <Route exact path='/play'><InGame slideDeck={this.state.activeSlides} updateGames={this.updateGames} stats={this.state.games} generateSlideDeck={this.generateSlideDeck}/></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
