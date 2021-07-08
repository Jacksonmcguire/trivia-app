import { QuestionSlide } from '../QuestionSlide/QuestionSlide'
import { ScoreBoard } from '../ScoreBoard/ScoreBoard'
import './InGame.scss'
import { useState, useEffect, useRef } from 'react'
import { EndSlide } from '../EndSlide/EndSlide'
import {Chat} from '../Chat/Chat'
import {socket} from '../App/App'
let player;

export const InGame = ({slideDeck, updateGames}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState([])
  const [slides, setSlides] = useState(slideDeck)
  const [room, setRoom] = useState('')

  useEffect(() => {
    socket.on('new game', (room) => {
      setRoom(room)

      // console.log(room, slideDeck)
      // console.log('new in the room:', name)
      // if (socket.id === host) {
      if (slideDeck.length) {

        socket.emit('submit slides', {slideDeck: slideDeck, room: room})
        setSlides(slideDeck)
      } 
      // }
    })

    socket.on('new player', ({ manager, slides, room }) => {
      console.log('hello')
      if (manager.games) {

        updateGames(manager.games)
      } 
      setSlides(slides)
      setRoom(room)
    })


    // socket.on('slides submitted', (manager) => {
    //   // console.log(manager.games)
    //   updateGames(manager.games)
    // })

  })

  const questionSlides = () => {
    console.log(slides)
    if (slides.length) {
      const slideCards = slides.map(question => {
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
      socket.emit('correct answer', room)
    } else {
      setIncorrectAnswers([...incorrectAnswers, answer])
      socket.emit('wrong answer', room)
    }
    setCurrentQuestion(currentQuestion + 1)

  }
      
  return (
    <main className="in-game">
      {questionSlides()}
      {/* <ScoreBoard question={currentQuestion} score={score}/> */}
      {/* <Chat></Chat> */}
    </main>
  )
}
