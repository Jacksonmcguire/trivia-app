import { render } from '@testing-library/react'
import { Component } from 'react'
import { getCategories } from '../../apiCalls'
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
  }



  render() {return (
    <main className="lobby">
      <JoinGameForm/>
      <NewGameForm activeSlides={this.state.activeSlides} 
      categories={this.state.categories} 
      generateSlideDeck={this.props.generateSlideDeck}
      stats={this.props.stats}/>
    </main>
  )}
}