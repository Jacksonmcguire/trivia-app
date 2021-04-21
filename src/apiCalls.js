export const getCategories = () => {
  return fetch('https://opentdb.com/api_category.php')
  .then(res => res.json())
}

export const getRandomDeck = (index) => {
  return fetch('https://opentdb.com/api.php?amount=10&category=' + String(index))
  .then(res => res.json())
}

export const getChosenDeck = (str) => {
  if (str === '') str = 'amount=10'
  return fetch('https://opentdb.com/api.php?' + str)
  .then(res => res.json())
}