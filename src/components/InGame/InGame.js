import { QuestionSlide } from '../QuestionSlide/QuestionSlide'
import { ScoreBoard } from '../ScoreBoard/ScoreBoard'
import './InGame.scss'
import { useState, useEffect } from 'react'
import { EndSlide } from '../EndSlide/EndSlide'
export const InGame = ({ slides, startNewRound, gameStats }) => {

  // const [gameScore, setGameScore] = useState({score: 0, questions: 0})
  
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState([])
  const [correctAnswers, setCorrectAnswers] = useState([])
  
  const newRound = () => {
    console.log(score)
    const roundArgs = {correct: score, length: slides.length, incorrect: incorrectAnswers, correctAnswers: correctAnswers }
    setCurrentQuestion(0)
    setScore(0)
    setCorrectAnswers([])
    setIncorrectAnswers([])
    startNewRound(roundArgs);
    (console.log(slides))
  }

  const questionSlides = () => {
    console.log(slides)
    if (slides.length) {
      const slideDeck = slides.map(question => {
        console.log(question)
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
      return currentQ? currentQ : <EndSlide slides={slides} score={score} newRound={newRound}/>
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