import axios from 'axios';
import apiUrl from './apiConfig.js'

// DEVELOPMENT URL http://localhost:4741/
// PRODUCTION URL https://guarded-shore-72344.herokuapp.com/

export const makeDeposit = (token, price) => {
  return axios({
    url: `${apiUrl}/charges`,
    method: 'POST',
    headers: {"Content-Type": "Application/json"},
    data: {
      deposit: {
        token: token,
        price: price
      }
    }
  })
}
