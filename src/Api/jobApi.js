import axios from 'axios';
import apiUrl from './apiConfig.js'

export const createJob = (job, userId) => {
  return axios({
    url: `${apiUrl}/jobs`,
    method: 'POST',
    headers: {"Content-Type": "Application/json"},
    data: {
      job: {
        quote_user_id: userId,
        user_written_details: job.writtenDetails,
        sidewalk: job.jobDetails.Sidewalk,
        stairs: job.jobDetails.Stairs,
        walkway: job.jobDetails.Walkway,
        driveway: job.jobDetails.Driveway,
        parking_lot: job.jobDetails.Parking_Lot,
        trash: job.jobDetails.Trash,
        porch: job.jobDetails.Porch,
        garage_entrances: job.jobDetails.Garage_Entrances,
        salt: job.jobDetails.Salt,
        shoveling_between_cars: job.jobDetails.Shoveling_Between_Cars,
        total_area: job.jobDetails.total_area
      }
    }
  })
}

export const updateJob = (job, packageSelection) => {
  return axios({
    url: `${apiUrl}/jobs/${job.id}`,
    headers: {"Content-Type": "Application/json"},
    method: 'PATCH',
    data: {
      job: {
        id: job.id,
        selected_package: packageSelection,
        quote_price: packageSelection
      }
    }
  })
}
