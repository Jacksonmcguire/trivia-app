import './NewGameForm.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { socket } from '../App/App'

export class NewGameForm extends React.Component {

  constructor() {
    super()
    this.state = {
      difficulty: '',
      category: '',
      amount: 10,
      type: '',
      room: '',
      name: '',
    }
  }

  categoryOptions = () => {
    return this.props.categories.map((category, index) => {
      return <option key={index} value={category.id}>{category.name}</option>
    })
  }

  handleChange = (e) => {
    if (e.target.name !== 'type') {
      this.setState({...this.state, [e.target.name]: e.target.value.toLowerCase()})
    } else this.setState({...this.state, [e.target.name]: e.target.id})
  } 

  fetchTriviaSet = async () => {
    let fetchUrl = '';
    Object.keys(this.state).forEach((prop, index) => {
      if (this.state[prop] !== '' && index !== 0 && prop !== 'room') {
        fetchUrl += `&${prop + '=' + this.state[prop]}`
      }
      else if (this.state[prop] !== '' && index === 0 && prop !== 'room') {
        fetchUrl = `${prop + '=' + this.state[prop]}`
      } 
    })
    await this.props.generateSlideDeck(fetchUrl, this.state.room)
    if (this.checkRooms()) {
      // window.location.pathname = '/play'
      socket.emit('create game', {room: this.state['room'], name: this.state['name']})
    } else {
      window.location.pathname = ''
    }

  }

  checkRooms = () => {
      if (this.state.room === '') {
        return false
      } else {

        const duplicate = this.props.stats.find(game => game.room === this.state['room'])
        console.log(this.props.stats)
        if (!duplicate) {
          return true
        } else return false
      }
    }


  render () {
    return (
    <form className="new-game"
    onChange={(e) => this.handleChange(e)}>Host Game
      <select name="difficulty">
        <option>Difficulty</option>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
      <select name="category">
        <option>Category</option>
        {this.categoryOptions()}
      </select>
      <input type="number" name="amount" placeholder="Number of Slides" required min="0"/>
      <div>
      <input type="radio" name="type" id="boolean"/>
      <label htmlFor="boolean">True / False</label>
      <input type="radio" name="type" id="multiple"/>
      <label htmlFor="multiple">Multiple Choice</label>
      </div>
      <div>

        <input name="room" placeholder="Room Name" required/>
        <input name="name" placeholder="Username" required/>
      </div>
      <Link to="/play" onClick={() => this.fetchTriviaSet()}>
        <button>Start</button>
      </Link>
    </form>
  )
  }
}