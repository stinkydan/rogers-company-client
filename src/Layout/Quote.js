import React, { Component } from 'react';

import { getQuote } from './../Api/quoteApi'

import Map from './Map'

class Quote extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      phone: '',
      address: '',
      jobType: '',
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
  const { name, email, phone, address, jobType, area } = this.state

  const job = {
    client_name: name,
    client_email: email,
    client_phone: phone,
    client_address: address,
    job_type: jobType,
    area: area
  }

  getQuote(job)
    .then(
      res => console.log(res.data, 'API QUOTE')
    )
}

handleChange = event => {
  this.setState({ [event.target.name]: event.target.value })
}

updateArea = newArea => {
  console.log(newArea, '^^^updateArea ran')
  this.setState({ area: newArea })
}

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
            <select className="job-dropdown" name="jobType" onChange={(event) => this.handleChange(event)}>
              <option>Select Job</option>
              <option value="Landscaping">Landscaping</option>
              <option value="Weeding">Weeding</option>
              <option value="Lawn_Care">Lawn Care</option>
              <option value="Garden_Clearance">Garden Clearance</option>
              <option value="Weed_Wacking">Weed Wacking</option>
              <option value="Grass_Installation">Grass Installation</option>
              <option value="Trimming&Pruning">Trimming & Pruning</option>
              <option value="Mulch">Mulch</option>
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
