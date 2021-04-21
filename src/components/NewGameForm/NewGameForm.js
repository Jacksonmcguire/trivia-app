import './NewGameForm.scss'
import React from 'react'
import { Link } from 'react-router-dom'
export class NewGameForm extends React.Component {

  categoryOptions = () => {
    return this.props.categories.map((category, index) => {
      console.log(category)
      return <option key={index}>{category.name}</option>
    })
  }

  render () {
    return (
    <form className="new-game">New Game
      <select>
        <option>Difficulty</option>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
      <select>
        <option>Category</option>
        {this.categoryOptions()}
      </select>
      <input type="number" placeholder="Number of Slides"/>
      <input type="radio" name="question-type"/>
      <input type="radio" name="question-type"/>
      <input placeholder="Room Name"/>
      <Link to="/play">
      <button>Start</button>
      </Link>
    </form>
  )
  }
}