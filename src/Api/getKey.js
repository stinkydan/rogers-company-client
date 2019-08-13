import axios from 'axios'

export default function getKey () {
  return axios(
    {
      method: 'GET',
      url: ' http://localhost:4741/get-key'
    }
  )
}
