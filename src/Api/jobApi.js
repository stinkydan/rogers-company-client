import axios from 'axios';
// import apiUrl from './apiConfig.js'

export const createJob = (job, userId) => {
  return axios({
    url: "http://localhost:1337/jobs",
    method: 'POST',
    headers: {"Content-Type": "Application/json"},
    data: {
      userId: userId,
      workAreas: job.selectedJobs,
      customerExplanation: job.customerExplanation
      }
    }
  )
}

export const updateJob = (job, packageSelection) => {
  return axios({
    url: `http://localhost:1337/jobs/${job._id}`,
    headers: {"Content-Type": "Application/json"},
    method: 'PUT',
    data: {
      id: job._id,
      selectedPackage: packageSelection[0],
      quotePrice: packageSelection[1]
      }
    }
  )
}
