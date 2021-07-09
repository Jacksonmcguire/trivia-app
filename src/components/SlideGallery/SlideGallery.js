import './SlideGallery.scss'
import { SlideDeck } from '../SlideDeck/SlideDeck'

export const SlideGallery = ({slideDecks}) => {
  const randomDecks = slideDecks.map((slideDeck, index) => {
    return <SlideDeck 
    key={index}
    category={slideDeck[0].category}
    length={slideDeck.length}
    />
  })
  return (
    <section className="slide-gallery">
      {randomDecks}
    </section>
  )
}