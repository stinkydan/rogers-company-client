import React, { Component } from 'react';
import axios from 'axios'

import Map from './Map'

class Quote extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      phone: '',
      address: '',
      jobRate: 50,
      area: ''
    }
  }

calendlyWidget = () => {
  // eslint-disable-next-line
  Calendly.initPopupWidget({
    url: 'https://calendly.com/mverost4422?hide_landing_page_details=1',
    parentElement: document.getElementById('calendly-widget'),
    text: 'Schedule time with me',
    color: '#00a2ff',
    textColor: '#ffffff',
    branding: true
  });
}

calcQuote = () => {
  const { name, email, phone, address, jobRate, area } = this.state

  const timeInMin = area * 2

  const timeInHours = timeInMin / 60

  const quote = jobRate * timeInHours

  const job = {
    client_name: name,
    client_email: email,
    client_phone: phone,
    client_address: address,
    job_rate: jobRate,
    area: area,
    time_in_min: timeInMin,
    quote: quote
  }

  return this.getQuote(job)
}

getQuote = job => {
  return axios(
    {
      method: 'POST',
      url: 'http://localhost:4741/jobs',
      data: { job }
    }
  )
  .then(res => console.log(res.data.job.quote, 'API QUOTE'))
}

handleChange = event => {
  this.setState({ [event.target.name]: event.target.value })
}

updateArea = newArea => {
  console.log(newArea, '^^^updateArea ran')
  this.setState({ area: newArea })
}

// <Map
//    google={this.props.google}
//    center={{lat: 42.3601, lng: -71.0589}}
//    height='100%'
//    zoom={15}
// />
  render() {
    const { name, email, phone, address } = this.state

    return (
      <>
        <div className="quote-page-container">

        <Map
          className="google-map"
          google={this.props.google}
          center={{lat: 42.3601, lng: -71.0589}}
          height='100%'
          zoom={15}
          updateArea={this.updateArea}
        />

          <div className="quote-form-container">
            <select className="job-dropdown" name="jobRate">
              <option value="50">Landscaping</option>
              <option value="50">Weeding</option>
              <option value="50">Lawn Care</option>
              <option value="55">Garden Clearance</option>
              <option value="55">Weed Wacking</option>
              <option value="55">Grass Installation</option>
              <option value="55">Trimming & Pruning</option>
              <option value="55">Mulch</option>
            </select>

            <label>Name</label>
            <input name="name" type="text" placeholder="John Doe" value={name} onChange={(event) => this.handleChange(event)} className="quote-input"/>

            <label>Email</label>
            <input name="email" type="text" placeholder="example@email.com" value={email} onChange={(event) => this.handleChange(event)} className="quote-input"/>

            <label>Phone Number</label>
            <input name="phone" type="tel" placeholder="555-555-5555" value={phone} onChange={(event) => this.handleChange(event)} className="quote-input"/>

            <label>Address</label>
            <input name="address" type="text" placeholder="Address" value={address} onChange={(event) => this.handleChange(event)} className="quote-input"/>

            <button className="get-quote-button" onClick={this.calcQuote}>Get Quote</button>
          </div>
        </div>
      </>
    )
  }
}

export default Quote
