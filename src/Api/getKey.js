import axios from 'axios'
// import apiUrl from './apiConfig.js'

export default function getKey () {
  return axios(
    {
      method: 'GET',
      url: 'http://localhost:1337/get-key'
    }
  )
}
