import { QuestionSlide } from '../QuestionSlide/QuestionSlide'
import { ScoreBoard } from '../ScoreBoard/ScoreBoard'
import {GrPrevious , GrNext} from 'react-icons/gr'
import './InGame.scss'
import { Component } from 'react'
import { EndSlide } from '../EndSlide/EndSlide'
export class InGame extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: 0,
      slides: [],
      score: 0,
      incorrectAnswers: [],
    }
  }
  

  questionSlides = () => {
    if (this.props.slides.length) {
      const slides = this.props.slides.map(question => {
        console.log(question)
        return (
          <QuestionSlide
          category={question.category}
          incorrectAnswers={question.incorrect_answers}
          correct={question.correct_answer}
          question={question.question}
          type={question.type}
          evaluateAnswer={this.evaluateAnswer}
          />
          )
        })
      return slides[this.state.currentQuestion]? slides[this.state.currentQuestion] : <EndSlide slides={slides} score={this.state.score}/>
      } else return <div>sorry</div>
  }

  evaluateAnswer = (correct, answer) => {
    if (answer === correct) {
      this.setState({...this.state, score: this.state.score + 1, currentQuestion: this.state.currentQuestion + 1})
    } else this.setState({...this.state, incorrectAnswers: [...this.state.incorrectAnswers, answer], currentQuestion: this.state.currentQuestion + 1})

  }
      
      render () {
    return (
      <main className="in-game">
        <GrPrevious/>
        {this.questionSlides()}
        <GrNext/>
        <ScoreBoard/>
      </main>
    )
  }
}