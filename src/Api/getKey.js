import axios from 'axios'

export default function getKey () {
  return axios(
    {
      method: 'GET',
      url: 'https://guarded-shore-72344.herokuapp.com/get-key'
    }
  )
}
