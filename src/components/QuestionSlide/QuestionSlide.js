import './QuestionSlide.scss'
export const QuestionSlide = () => {
  return (
    <form className="current-q">
      <h3>Question</h3>
      <input type="radio" id="opt1" name="option"/>
      <label htmlFor="opt1">Option 1</label> 
      <input type="radio" id="opt2" name="option"/>
      <label htmlFor="opt2">Option 2</label> 
      <input type="radio" id="opt3" name="option"/>
      <label htmlFor="opt3">Option 3</label> 
      <input type="radio" id="opt4" name="option"/>
      <label htmlFor="opt4">Option 4</label> 
      <button>Submit Answer</button>
    </form>
  )
}