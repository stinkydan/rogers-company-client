import axios from 'axios'

// DEVELOPMENT URL http://localhost:4741/
// PRODUCTION URL https://guarded-shore-72344.herokuapp.com/

export const checkAvailability = day => {
  return axios(
    {
      method: 'post',
      url: 'https://guarded-shore-72344.herokuapp.com/check-availability',
      data: { day }
    }
  )
}
