import './QuestionSlide.scss'
import { useState } from 'react'
export const QuestionSlide = ({category, incorrectAnswers, correct, question, type, evaluateAnswer}) => {

  const [answer, setAnswer] = useState('')

  const addAnswers = () => {
    const randomIndex = Math.floor(Math.random() * 4)
    if (!incorrectAnswers.includes(correct)) {
      incorrectAnswers.splice(randomIndex, 0, correct);
    }
    return incorrectAnswers.map((answer, index) => {
      return <div className="option">
      <input type="radio" id={'opt' + index + 1} name="option"/>
      <label htmlFor={'opt' + index + 1}>{answer}</label>
      </div>
    })
    
  }

  const answerQuestion = (e) => {
    e.preventDefault()
    if (answer !== '') evaluateAnswer(correct, answer)
    clearInputs()
  }

  const updateAnswer = (e) => {
    setAnswer(e.target.labels[0].innerText)
  }

  const clearInputs = () => {
    const inputs = document.querySelectorAll('input[type="radio"]')
    inputs.forEach(input => input.checked = false)
  } 

  return (
    <form className="current-q" onChange={(e) => updateAnswer(e)}>
      <h3>{question}</h3>
      {addAnswers()}
      <button onClick={answerQuestion}>Submit Answer</button>
    </form>
  )
}