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
    }
  }

  generateSlideDeck = (str) => {
    getChosenDeck(str)
    .then(data => {
      this.setState({activeSlides: data.results})
    })
  }  
  render() {
    return (
      <div className="App">
        <header>Trivia App</header>
        <Switch>
        <Route exact path='/'><Lobby generateSlideDeck={this.generateSlideDeck}/></Route>
        <Route exact path='/play'><InGame slideDeck={this.state.activeSlides}/></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
