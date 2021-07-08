import { QuestionSlide } from '../QuestionSlide/QuestionSlide'
import { ScoreBoard } from '../ScoreBoard/ScoreBoard'
import './InGame.scss'
import { useState, useEffect, useRef } from 'react'
import { EndSlide } from '../EndSlide/EndSlide'
import {Chat} from '../Chat/Chat'
import {socket} from '../App/App'
import { HostView } from '../HostView/HostView'

export const InGame = ({slideDeck, updateGames}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState([])
  const [slides, setSlides] = useState(slideDeck)
  const [room, setRoom] = useState('')
  const [host, setHost] = useState('')
  const [hostView, setHostView] = useState(false)
  const [hostData, setHostData] = useState({})
  console.log(socket.id)
  useEffect(() => {
    
    socket.on('new game', ({room, host}) => {
      setRoom(room)
      setHost(host)
      if (socket.id === host) setHostView(true); setHostData({room: room, host: host, slideDeck: slideDeck, players: []})
      if (slideDeck.length) {

        socket.emit('submit slides', {slideDeck: slideDeck, room: room})
        setSlides(slideDeck)
      } 
    })

    socket.on('update score', (manager) => {
      if (hostView) {
        setHostData(manager.games.find(game => game.room === room))
      } 
    }) 

    socket.on('new player', ({ manager, slides, room }) => {
      if (manager.games) {

        updateGames(manager.games)
      } 
      if (hostView) {
        const game = manager.games.find(game => game.room === room)
        game && setHostData(game)

      }
      setSlides(slides)
      setRoom(room)
    })
  })

  const questionSlides = () => {
    console.log(slides)
    if (slides.length) {
      const slideCards = slides.map(question => {
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
      {
        !hostView ? questionSlides() : <HostView slideDeck={hostData.slideDeck} players={hostData.players}/>
      // {/* <Chat></Chat> */}
      }
    </main>
  )
}
