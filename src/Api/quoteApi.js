import axios from 'axios'

// DEVELOPMENT URL http://localhost:4741/

export const getQuote = job => {
  return axios(
    {
      method: 'POST',
      url: 'https://guarded-shore-72344.herokuapp.com/quote_calculator',
      data: { job }
    }
  )
}
