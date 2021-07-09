import { QuestionSlide } from '../QuestionSlide/QuestionSlide'
import { ScoreBoard } from '../ScoreBoard/ScoreBoard'
import './InGame.scss'
import { useState, useEffect, useRef } from 'react'
import { EndSlide } from '../EndSlide/EndSlide'
import {Chat} from '../Chat/Chat'
import {socket} from '../App/App'
import { HostView } from '../HostView/HostView'

export const InGame = ({slideDeck, updateGames, stats}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState([])
  const [slides, setSlides] = useState(slideDeck)
  const [room, setRoom] = useState('')
  const [host, setHost] = useState('')
  const [hostView, setHostView] = useState(false)
  const [hostData, setHostData] = useState({})
  const [error, setError] = useState(false)

  console.log(socket.id)
  useEffect(() => {
    
    socket.on('new game', ({room, host}) => {
      setRoom(room)
      setHost(host)
      if (socket.id === host) setHostView(true); setHostData({room: room, host: host, slideDeck: slideDeck, players: []})
      if (slideDeck.length) {
        setError(false)
        socket.emit('submit slides', {slideDeck: slideDeck, room: room})
        setSlides(slideDeck)
      } 
    })

    socket.on('duplicate room', ({room, id}) => {
      if (id === socket.id && error === false) {
        window.location.pathname = ''
        setError(true)
        alert(`${room} is already in use, please pick a more unique name.`)
      }
    })

    socket.on('failed join', ({room, id}) => {
      if (id === socket.id && error === false) {
        window.location.pathname = ''
        setError(true)
        alert(`We cant find the room: ${room}.`)
      }
    })

    socket.on('update score', ({manager, room}) => {
        setHostData(manager.games.find(game => game.room === room))
        setRoom(room);
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
      setError(false)
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
        
      return slideCards[currentQuestion]? slideCards[currentQuestion] : <EndSlide score={hostData} leaveRoom={leaveRoom}/>
      } else return <div>sorry</div>
  }

  const leaveRoom = () => {
    socket.emit('leaving player', room)
  }

  const endGame = () => {
    socket.emit('end game', room)
    window.location.pathname = ''
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
        !hostView ? <section>{questionSlides()}<Chat socket={socket} room={room}/></section> : <HostView slideDeck={hostData.slideDeck} players={hostData.players} socket={socket} room={room} endGame={endGame}/>
      }
    </main>
  )
}
