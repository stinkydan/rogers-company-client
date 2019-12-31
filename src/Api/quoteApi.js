import axios from 'axios'
import apiUrl from './apiConfig.js'

export const getQuote = (jobInfo, userId) => {
  return axios(
    {
      method: 'POST',
      url: `${apiUrl}/quote_calculator`,
      data: {
        job: {
          quote_user_id: userId,
          user_written_details: jobInfo.writtenDetails,
          sidewalk: jobInfo.jobDetails.Sidewalk,
          stairs: jobInfo.jobDetails.Stairs,
          walkway: jobInfo.jobDetails.Walkway,
          driveway: jobInfo.jobDetails.Driveway,
          parking_lot: jobInfo.jobDetails.Parking_Lot,
          trash: jobInfo.jobDetails.Trash,
          porch: jobInfo.jobDetails.Porch,
          garage_entrances: jobInfo.jobDetails.Garage_Entrances,
          salt: jobInfo.jobDetails.Salt,
          shoveling_between_cars: jobInfo.jobDetails.Shoveling_Between_Cars,
          total_area: jobInfo.jobDetails.total_area
        }
      }
    }
  )
}

export const saveUser = userInfo => {
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
