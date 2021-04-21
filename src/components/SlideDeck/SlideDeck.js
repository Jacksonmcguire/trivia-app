import './SlideDeck.scss'
export const SlideDeck = ({category, length}) => {

  return (
    <div className="slide-deck">
      <h3>{category}</h3>
      <p>{length}</p>
    </div>
  )
}