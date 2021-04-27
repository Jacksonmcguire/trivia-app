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
  
  const newRound = (total = slides.length) => {
    const roundArgs = {
      correct: score, 
      length: total, 
      incorrect: incorrectAnswers, 
      correctAnswers: correctAnswers, 
      category: slides[0].category 
    }
    startNewRound(roundArgs);
    setCurrentQuestion(0)
    setScore(0)
    setCorrectAnswers([])
    setIncorrectAnswers([])
  }

  useEffect(() => {
    let startedRound = false;
    slides.forEach(slide => {
      if (gameStats.correctQuestions.includes(slide.question) && startedRound === false) {
        determineRepeats(slide)
        startedRound = true;
      } else return;
    });
  }, [slides])

  const updateAppState = (total = slides.length) => {
    const roundArgs = {
      correct: score, 
      length: total, 
      incorrect: incorrectAnswers, 
      correctAnswers: correctAnswers,
      category: slides[0].category 
    }
    endGame(roundArgs)
  }

  const questionSlides = () => {
    if (slides.length) {
      const slideDeck = slides.map(question => {
        return (
          <QuestionSlide
          incorrectAnswers={question.incorrect_answers}
          correct={question.correct_answer}
          question={question.question}
          evaluateAnswer={evaluateAnswer}
          key={question.question}
          />
          )
      })
      const currentQ = slideDeck[currentQuestion]
      const endSlide = <EndSlide slides={slides} score={score} newRound={newRound} endGame={updateAppState}/>
      return currentQ? currentQ : endSlide;
    } else return <div>sorry</div>
  }

  const determineRepeats = (currentQ) => {
    if (currentQ && gameStats.correctQuestions.includes(currentQ.question)) {
      console.log('new round')
      newRound(0)
    } else return true
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