import axios from 'axios'
import apiUrl from './apiConfig.js'

export default function getKey () {
  return axios(
    {
      method: 'GET',
      url: `${apiUrl}/get-key`
    }
  )
}
