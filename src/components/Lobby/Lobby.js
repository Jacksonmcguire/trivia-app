import { render } from '@testing-library/react'
import { func } from 'prop-types'
import { Component } from 'react'
import { getCategories, getRandomDeck } from '../../apiCalls'
import { NewGameForm } from '../NewGameForm/NewGameForm'
import { SlideGallery } from '../SlideGallery/SlideGallery'
import './Lobby.scss'

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
      <NewGameForm categories={this.state.categories} generateSlideDeck={this.props.generateSlideDeck}/>
    </main>
  )}
}

Lobby.propTypes = {
  generateSlideDeck: func,
}