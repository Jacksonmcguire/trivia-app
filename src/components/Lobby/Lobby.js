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
      name: '',
      action: '',
    }
  }

  componentDidMount() {
    getCategories()
    .then(data => this.setState({categories: data.trivia_categories}))
  }

  inputName = (e) => {
    this.setState({...this.state, name: e.target.value})
  }

  action = (e) => {
    // e.preventDefault()
    if (this.state.name !== '') {

      this.setState({...this.state, action: e.target.name})
    }
  }


  render() {return (
    <main className="lobby">
      {this.state.action === '' && <form className="action-form">
      <input placeholder="name" onChange={this.inputName} required></input>
      <div>
      <button className="action-btn" name="host" onClick={this.action}>Host a Game</button>
      <button className="action-btn" name="join" onClick={this.action}>Join a Game</button>
      </div>
      </form>}
      
      {this.state.action === 'join' && <JoinGameForm name={this.state.name}/>}
      {this.state.action === 'host' && <NewGameForm name={this.state.name} 
      activeSlides={this.state.activeSlides} 
      categories={this.state.categories} 
      generateSlideDeck={this.props.generateSlideDeck}
      stats={this.props.stats}/>
    }
    </main>
  )}
}