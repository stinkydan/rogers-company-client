import axios from 'axios'
import apiUrl from './apiConfig.js'

export const getQuote = job => {
  return axios(
    {
      method: 'POST',
      url: `${apiUrl}/quote_calculator`,
      data: { job }
    }
  )
}
