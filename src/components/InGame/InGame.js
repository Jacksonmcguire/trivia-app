import { QuestionSlide } from '../QuestionSlide/QuestionSlide'
import { ScoreBoard } from '../ScoreBoard/ScoreBoard'
import './InGame.scss'
import { useState, useEffect } from 'react'
import { EndSlide } from '../EndSlide/EndSlide'
import PropTypes from 'prop-types'
export const InGame = ({ slides, startNewRound, gameStats, endGame}) => {

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState([])
  const [correctAnswers, setCorrectAnswers] = useState([])
  
  const newRound = () => {
    const roundArgs = {correct: score, length: slides.length, incorrect: incorrectAnswers, correctAnswers: correctAnswers }
    console.log(roundArgs)
    startNewRound(roundArgs);
    setCurrentQuestion(0)
    setScore(0)
    setCorrectAnswers([])
    setIncorrectAnswers([])
  }

  const updateAppState = () => {
    const roundArgs = {correct: score, length: slides.length, incorrect: incorrectAnswers, correctAnswers: correctAnswers }
    endGame(roundArgs)
    console.log(roundArgs)
  }

  const questionSlides = () => {
    if (slides.length) {
      const slideDeck = slides.map(question => {
        return (
          <QuestionSlide
          category={question.category}
          incorrectAnswers={question.incorrect_answers}
          correct={question.correct_answer}
          question={question.question}
          type={question.type}
          evaluateAnswer={evaluateAnswer}
          key={question.question}
          />
          )
        })
      const currentQ = slideDeck[currentQuestion]
      return currentQ? currentQ : <EndSlide slides={slides} score={score} newRound={newRound} endGame={updateAppState}/>
      } else return <div>sorry</div>
  }

  const evaluateAnswer = (correct, answer, question) => {
    if (answer === correct) {
      setScore(score + 1)
      setCorrectAnswers([...correctAnswers, question])
    } else {
      setIncorrectAnswers([...incorrectAnswers, {question: question, correct: correct, answer: answer}])
    }
    setCurrentQuestion(currentQuestion + 1)

  }

      
    return (
      <main className="in-game">
        {questionSlides()}
        <ScoreBoard question={currentQuestion} score={score} gameScore={gameStats}/>
      </main>
    )
  
}

InGame.propTypes = {
   slides: PropTypes.array.isRequired, 
   startNewRound: PropTypes.func.isRequired, 
   gameStats: PropTypes.object.isRequired, 
   endGame: PropTypes.func.isRequired
}