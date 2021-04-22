import './ScoreBoard.scss'
export const ScoreBoard = ({question, score}) => {
  return <div>ScoreBoard
      <h3>Current Round: {score + '/' + question}</h3>
  </div>
}