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
      jobType: null
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

getQuote = () => {
  return axios({
    method: 'GET',
    url: 'http://localhost:4741/get-quote',
  })
  .then(res => console.log(res))
}

handleChange = event => {
  this.setState({ [event.target.name]: event.target.value })
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
          address={this.state.address}
        />

          <div className="quote-form-container">
            <select className="job-dropdown" name="jobType">
              <option value="landscaping">Landscaping</option>
              <option value="weeding">Weeding</option>
              <option value="lawn-care">Lawn Care</option>
              <option value="garden-clearance">Garden Clearance</option>
              <option value="weed-wacking">Weed Wacking</option>
              <option value="grass-installation">Grass Installation</option>
              <option value="trimming-pruning">Trimming & Pruning</option>
              <option value="mulch">Mulch</option>
            </select>

            <label>Name</label>
            <input name="name" type="text" placeholder="John Doe" value={name} onChange={(event) => this.handleChange(event)} className="quote-input"/>

            <label>Email</label>
            <input name="email" type="text" placeholder="example@email.com" value={email} onChange={(event) => this.handleChange(event)} className="quote-input"/>

            <label>Phone Number</label>
            <input name="phone" type="tel" placeholder="555-555-5555" value={phone} onChange={(event) => this.handleChange(event)} className="quote-input"/>

            <label>Address</label>
            <input name="address" type="text" placeholder="Address" value={address} onChange={(event) => this.handleChange(event)} className="quote-input"/>

            <button className="get-quote-button" onClick={() => this.getQuote()}>Get Quote</button>
          </div>
        </div>
      </>
    )
  }
}

export default Quote
