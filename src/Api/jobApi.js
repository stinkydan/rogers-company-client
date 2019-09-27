import axios from 'axios';
import apiUrl from './apiConfig.js'

export const createJob = (userId, userToken, job) => {
  return axios({
    url: `${apiUrl}/jobs`,
    method: 'POST',
    headers: {
      "Content-Type": "Application/json",
      'Authorization': `Token token=${userToken}`
    },
    data: {
      job: {
        user_id: userId,
        job_type: job.jobType,
        job_rate: job.jobRate,
        area: job.area,
        time_in_min: job.time,
        quote: job.quote,
        job_date: job.date,
        job_time: job.jobTime
      }
    }
  })
}
