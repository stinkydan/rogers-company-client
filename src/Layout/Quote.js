import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

import { getQuote } from './../Api/quoteApi';

import Map from './Map';
import Form from './Form';

class Quote extends Component {
  constructor() {
    super()
    this.state = {
      name: null,
      email: null,
      phone: null,
      address: null,
      jobType: "Landscaping",
      area: null,
      shouldRedirect: false
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
    .then(res => {
    console.log(res)
    this.setState({
      quote: res.data.price,
      jobRate: res.data.jobRate,
      time: res.data.time
    })
  })
}

handleChange = event => {
  this.setState({ [event.target.name]: event.target.value })
}

validateForm = (e) => {
  e.preventDefault()

  this.state.area ? this.calcQuote() : console.log("FUCK NO")
}

updateArea = newArea => {
  console.log(newArea, '^^^updateArea ran')
  this.setState({ area: newArea })
}

  render() {
    if (this.state.time) {
      return (
        <Redirect
          to={{
            pathname: '/quote-confirmation',
            state: {
              name: this.state.name,
              quote: this.state.quote,
              time: this.state.time,
              jobType: this.state.jobType,
              jobRate: this.state.jobRate
            }
          }}
        />
      );
    } else {
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

          <Form
            handleChange={this.handleChange}
            validateForm={this.validateForm}
          />
          </div>
        </>
      );
    }
  }
}

export default withRouter(Quote)
