import axios from 'axios'
import apiUrl from './apiConfig.js'

export const signUp = credentials => {
  return axios(
    {
      method: 'post',
      url: `${apiUrl}/sign-up`,
      data: { credentials }
    }
  )
}

export const signIn = (email, password) => {
  return axios(
    {
      method: 'post',
      headers: {"Content-Type": "Application/json"},
      url: `${apiUrl}/sign-in`,
      data: {
        credentials: {
          client_email: email,
          password: password
        }
      }
    }
  )
}
