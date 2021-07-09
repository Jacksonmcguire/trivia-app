import './App.scss';
import { Lobby } from '../Lobby/Lobby'
import { InGame } from '../InGame/InGame'
import { Route, Switch } from 'react-router-dom'
import { getChosenDeck } from '../../apiCalls'
import React from 'react';
import io from "socket.io-client"

export const socket = io.connect("http://localhost:4000");
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      activeSlides: [],
      games: [],
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
        console.log(manager)
        if (this.state.games !== manager.games) {
    
        this.setState({games: manager.games})
        }
      })
      // console.log(this.state.games)
    })  
  }

  generateSlideDeck = async (str, room) => {
      await getChosenDeck(str)
      .then(data => {
        this.setState({activeSlides: data.results})
      })
  } 
  
  render() {
    return (
      <div className="App">
        <header>Trivia App</header>
        <Switch>
        <Route exact path='/'><Lobby activeSlides={this.state.activeSlides} generateSlideDeck={this.generateSlideDeck} stats={this.state.games}/></Route>
        <Route exact path='/play'><InGame slideDeck={this.state.activeSlides} updateGames={this.updateGames} stats={this.state.games}/></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
