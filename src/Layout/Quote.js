import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

import { getQuote } from './../Api/quoteApi';

import Map from './Map';
import Form from './Forms/Form';
import LoadingPage from './LoadingPage'
import ErrorMessage from './ErrorMessage'

class Quote extends Component {
  constructor() {
    super()
    this.mapRef = React.createRef();
    this.state = {
      name: null,
      email: null,
      phone: null,
      address: '',
      jobType: "Landscaping",
      area: null,
      redirect: false,
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

addressChange = address => {
  this.setState({ address: address })
}

async handleUserInfo(job, user) {
  try {
      const res = await getQuote(job)

      job.quote = res.data.price
      job.time = res.data.time_in_hours
      job.jobRate = res.data.jobRate
      job.jobType = res.data.jobType

      this.setState({
        user: user,
        job: job,
        redirect: true
      })
    }

  catch {
    this.setState({ showLoadingPage: false })
    this.initError()
  }
}

onValidateSuccess = () => {
  const { name, email, phone, address, jobType, area } = this.state

  const job = {
    job_type: jobType,
    area: area
  }

  const user = {
    client_name: name,
    client_email: email,
    client_phone: phone,
    client_address: address
  }

  this.initLoadingPage();
  this.handleUserInfo(job, user);
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

scrollDown = () => {
  this.mapRef.current.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

  render() {
    // If this.state.time exists, then a quote was successfully calculated
    // and we should redirect to the confirmation page.
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: '/quote-confirmation',
            state: {
              user: this.state.user,
              job: this.state.job
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
            <div className="quote-directions">
              <h1>Quick. Easy. Accurate.</h1>
              <p>
                Our time tested quoting tools are gauranteed to give you an accurate quote in just a matter of seconds.
              </p>
              <p>Click here to get started!</p>
              <span className="quote-down-arrow" onClick={this.scrollDown}>&#8595;</span>
            </div>
          {// Only render map if api key is present. (Prevents errors if the page is refreshed)
            // Render transparent placeholder div if map isn't present for UI purposes.
            this.props.apiKey ?
            <div className="quote-map-container" ref={this.mapRef}>
              <div className="map-directions">
                <p>
                  <strong>First,</strong> let's mark the land that needs some work.<br/>Enter your address to pull up your house. Next, click on the map to place points around the area you want completed- clicking the first point will complete the shape. The area will turn green when you're done!
                </p>
              </div>

              <div className="google-map">
                <Map
                  google={this.props.google}
                  center={{lat: 42.3601, lng: -71.0589}}
                  height='100%'
                  zoom={15}
                  updateArea={this.updateArea}
                  apiKey={this.props.apiKey}
                  addressChange={this.addressChange}
                />
              </div>
            </div>
            : <div className="quote-map-container" ref={this.mapRef}><div className="google-map-placeholder"></div></div>
          }

            <Form
              handleChange={this.handleChange}
              validateForm={this.validateForm}
              address={this.state.address}
            />
          </div>
        </>
      );
    }
  }
}

export default withRouter(Quote)
