import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

import { getQuote } from './../Api/quoteApi';

import Map from './Map';
import Form from './Form';
import LoadingPage from './LoadingPage'
import ErrorMessage from './ErrorMessage'

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
      shouldRedirect: false,
      showLoadingPage: false,
      calcQuoteError: false
    }
  }

handleChange = event => {
  this.setState({ [event.target.name]: event.target.value });
}

initLoadingPage = () => {
  this.setState({ showLoadingPage: true });
}

initError = () => {
  this.setState({ calcQuoteError: true });

    setTimeout(() => this.setState({
      calcQuoteError: false
    }),
    5000
  );
}

// WILL BE USED ON PAYMENT SUCCESS

// calendlyWidget = () => {
//   // eslint-disable-next-line
//   Calendly.initPopupWidget({
//     url: 'https://calendly.com/mverost4422?hide_landing_page_details=1',
//     parentElement: document.getElementById('calendly-widget'),
//     text: 'Schedule time with me',
//     color: '#00a2ff',
//     textColor: '#ffffff',
//     branding: true
//   });
// }

calcQuote = job => {
  getQuote(job)
    .then(res => {
    this.setState({
      quote: res.data.price,
      jobRate: res.data.jobRate,
      time: res.data.time
    })
  })
  .catch(() => {
    this.setState({ showLoadingPage: false })
    this.initError()
  })
}

onValidateSuccess = () => {
  const { name, email, phone, address, jobType, area } = this.state

  const job = {
    client_name: name,
    client_email: email,
    client_phone: phone,
    client_address: address,
    job_type: jobType,
    area: area
  }
  this.initLoadingPage()
  this.calcQuote(job)
}

validateForm = (e) => {
  e.preventDefault()

  this.state.area ? this.onValidateSuccess() : console.log("FUCK NO")
}

updateArea = newArea => {
  console.log(newArea, '^^^updateArea ran')
  this.setState({ area: newArea })
}

dismissMessage = () => {
  this.setState({ calcQuoteError: false })
}

  render() {
    // If this.state.time exists, then a quote was successfully calculated
    // and we should redirect to the confirmation page.
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
          {this.state.showLoadingPage ? <LoadingPage /> : ''}

          {this.state.calcQuoteError ? <ErrorMessage dismissMessage={this.dismissMessage} /> : ''}

          <div className="quote-page-container">
          {// Only render map if api key is present. (Prevents errors if the page is refreshed)
            // Render transparent placeholder div if map isn't present for UI purposes.
            this.props.apiKey ?
            <Map
              className="google-map"
              google={this.props.google}
              center={{lat: 42.3601, lng: -71.0589}}
              height='100%'
              zoom={15}
              updateArea={this.updateArea}
              apiKey={this.props.apiKey}
            />
            : <div className="google-map-placeholder"></div>}

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
