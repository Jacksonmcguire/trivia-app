import { render } from '@testing-library/react'
import { Component } from 'react'
import { getCategories, getRandomDeck } from '../../apiCalls'
import { JoinGameForm } from '../JoinGameForm/JoinGameForm'
import { NewGameForm } from '../NewGameForm/NewGameForm'
import { SlideGallery } from '../SlideGallery/SlideGallery'
import './Lobby.scss'
import {socket} from '../App/App'

export class Lobby extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      randomSets: [],
      
    }
  }

  componentDidMount() {
    getCategories()
    .then(data => this.setState({categories: data.trivia_categories}))

    for (let i = 0; i < 3; i ++) {
      getRandomDeck(9)
      .then(data => this.setState({...this.state, randomSets: [...this.state.randomSets, data.results]}))
    } 
  }



  render() {return (
    <main className="lobby">
      <JoinGameForm/>
      <NewGameForm categories={this.state.categories} generateSlideDeck={this.props.generateSlideDeck}/>
      {/* <SlideGallery slideDecks={this.state.randomSets}/> */}
    </main>
  )}
}