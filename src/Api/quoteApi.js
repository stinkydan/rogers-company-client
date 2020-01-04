import axios from 'axios'
// import apiUrl from './apiConfig.js'

export const getQuote = async (jobInfo, userId) => {
  console.log(jobInfo)
   return axios(
    {
      method: 'POST',
      url: "http://localhost:1337/quote_calculator",
      data: {
        id: userId,
        writtenDetails: jobInfo.writtenDetails,
        selectedJobs: jobInfo.selectedJobs
      }
    }
  )
}

export const saveUser = async userInfo => {
  return axios(
    {
      method: 'POST',
      url: "http://localhost:1337/quote_user",
      data: {
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        address: userInfo.address
      }
    }
  )
}
