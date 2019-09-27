import axios from 'axios'
import apiUrl from './apiConfig.js'

export const checkAvailability = (day, userToken) => {
  return axios(
    {
      method: 'post',
      url: `${apiUrl}/check-availability`,
      headers: {
        "Content-Type": "Application/json",
        'Authorization': `Token token=${userToken}`
      },
      data: { day }
    }
  )
}
