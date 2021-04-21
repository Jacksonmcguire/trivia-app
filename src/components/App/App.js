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
        <Switch>
        <Route exact path='/'><Lobby generateSlideDeck={this.generateSlideDeck}/></Route>
        <Route exact path='/play'><InGame slides={this.state.activeSlides}/></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
