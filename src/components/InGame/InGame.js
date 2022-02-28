import { QuestionSlide } from '../QuestionSlide/QuestionSlide'
import { ScoreBoard } from '../ScoreBoard/ScoreBoard'
import './InGame.scss'
import { useState, useEffect, useRef } from 'react'
import { EndSlide } from '../EndSlide/EndSlide'
import {Chat} from '../Chat/Chat'
import {socket} from '../App/App'
import { HostView } from '../HostView/HostView'

export const InGame = ({slideDeck, updateGames, stats, generateSlideDeck}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState([])
  const [slides, setSlides] = useState(slideDeck)
  const [room, setRoom] = useState('')
  const [host, setHost] = useState('')
  const [hostView, setHostView] = useState(false)
  const [hostData, setHostData] = useState({})
  const [error, setError] = useState(false)

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

    socket.on('advance question', (game) => {
      setCurrentQuestion(game.currentQ)
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

    socket.on('starting new round', (slides) => {
      setSlides(slides)
    })

    socket.on('game ending', () => {
      window.location.pathname = ''
    })
  })

  const questionSlides = () => {
    if (slides[currentQuestion]) {
      const slideCard = <QuestionSlide
          category={slides[currentQuestion].category}
          incorrectAnswers={slides[currentQuestion].incorrect_answers}
          correct={slides[currentQuestion].correct_answer}
          question={slides[currentQuestion].question}
          type={slides[currentQuestion].type}
          evaluateAnswer={evaluateAnswer}
          key={slides[currentQuestion].question}
          />
        
      return slideCard 
      } else {
        return <EndSlide score={hostData} leaveRoom={leaveRoom}/>
      }
      
  }

  const leaveRoom = () => {
    socket.emit('leaving player', room)
  }

  const newRound = async () => {
    await generateSlideDeck().then(data => {
      socket.emit('new round', {room: room, slides: data})
    })
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
  }

  return (
    <main className="in-game">
      {
        !hostView ? 
        <section className="player-view">
          {questionSlides()}<Chat socket={socket} room={room}/>
        </section> : 
        <HostView 
        slideDeck={slides} 
        players={hostData.players} 
        socket={socket} 
        room={room} 
        endGame={endGame} 
        currentQuestion={currentQuestion} 
        newRound={newRound}
        />
      }
    </main>
  )
}
