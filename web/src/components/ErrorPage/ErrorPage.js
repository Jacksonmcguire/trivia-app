import { Link } from 'react-router-dom'
import './ErrorPage.scss'

export const ErrorPage = () => {
  return (
    <article>
      <h2>Sorry we can't find what you're looking for.</h2>
      <Link to='/'>Back to lobby...</Link>
    </article>
    )
}