import axios from 'axios'
import apiUrl from './apiConfig.js'

export const getQuote = jobInfo => {
  return axios(
    {
      method: 'POST',
      url: `${apiUrl}/quote_calculator`,
      data: { jobInfo }
    }
  )
}
