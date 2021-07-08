import { QuestionSlide } from '../QuestionSlide/QuestionSlide'
import { ScoreBoard } from '../ScoreBoard/ScoreBoard'
import './InGame.scss'
import { useState, useEffect, useRef } from 'react'
import { EndSlide } from '../EndSlide/EndSlide'
import {Chat} from '../Chat/Chat'
import {socket} from '../App/App'

export const InGame = ({slideDeck}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState([])
  

  useEffect(() => {
    socket.on('new game', (roomName) => {
      console.log('new game in room:', roomName)
    })

    socket.on('answer received')

  })

  const questionSlides = () => {
    if (slideDeck.length) {
      const slideCards = slideDeck.map(question => {
        // console.log(question)
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
      return slideCards[currentQuestion]? slideCards[currentQuestion] : <EndSlide slideCards={slideDeck} score={score}/>
      } else return <div>sorry</div>
  }

  const evaluateAnswer = (correct, answer) => {
    if (answer === correct) {
      setScore(score + 1)
      socket.emit('correct answer', correct)
    } else {
      setIncorrectAnswers([...incorrectAnswers, answer])
      socket.emit('wrong answer', answer)
    }
    setCurrentQuestion(currentQuestion + 1)

  }
      
  return (
    <main className="in-game">
      {questionSlides()}
      <ScoreBoard question={currentQuestion} score={score}/>
      <Chat></Chat>
    </main>
  )
}
