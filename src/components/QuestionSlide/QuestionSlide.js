import './QuestionSlide.scss'
import { useState } from 'react'
import { decodeHTML } from '../../utilities'
import { array, func, object, string } from 'prop-types'

export const QuestionSlide = ({category, incorrectAnswers, correct, question, type, evaluateAnswer}) => {

  const [answer, setAnswer] = useState('')

  const addAnswers = () => {
    const randomIndex = Math.floor(Math.random() * 4)
    if (!incorrectAnswers.includes(correct)) {
      incorrectAnswers.splice(randomIndex, 0, correct);
    }
    return incorrectAnswers.map((answer, index) => {
      return <div className="option">
      <input type="checkbox" id={'opt' + index + 1} name="option"/>
      <label htmlFor={'opt' + index + 1}>{decodeHTML(answer)}</label>
      </div>
    })
    
  }

  const answerQuestion = (e) => {
    e.preventDefault()
    if (answer !== '') {
      evaluateAnswer(decodeHTML(correct), answer, question)}
    clearInputs()
  }

  const updateAnswer = (e) => {
    const inputs = document.querySelectorAll('input[type="checkbox"]')
    inputs.forEach(input => {
      if (input !== e.target) input.checked = false;
    })
    setAnswer(e.target.labels[0].innerText)
  }

  const clearInputs = () => {
    const inputs = document.querySelectorAll('input[type="checkbox"]')
    inputs.forEach(input => input.checked = false)
  } 

  return (
    <form className="current-q" onChange={(e) => updateAnswer(e)}>
      <h3>{decodeHTML(question)}</h3>
      {addAnswers()}
      <button onClick={answerQuestion}>Submit Answer</button>
    </form>
  )
}

QuestionSlide.propTypes = {
  category: string.isRequired, 
  incorrectAnswers: array.isRequired, 
  correct: object.isRequired, 
  question: string.isRequired, 
  type: string.isRequired, 
  evaluateAnswer: func.isRequired
}