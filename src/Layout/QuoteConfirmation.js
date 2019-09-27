import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import LoadingPage from './LoadingPage';

import SignUpForm from './Forms/SignUpForm'

import image from './../images/cut-grass.jpg';

class QuoteConfirmation extends Component {
  constructor(props) {
    super(props)
    this.infoRef = React.createRef();

    this.state = {
      loadComplete: false,
      showPopup: false
    }
  }

  onLoad = () => {
    this.setState({ loadComplete: true })
  }

  scrollDown = () => {
    this.infoRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  initPopup = () => {
    this.setState({ showPopup: true })
  }

  render() {
    const { user, job } = this.props.location.state

    const fullPrice = this.props.location.state.job.quote

    // Truncate numbers to 2 decimal places for readability
    const quote = fullPrice.toFixed(2)

    const time = this.props.location.state.job.time.toFixed(2)

    // Remove underscores ( _ ) from jobType and make it lowercase
    // so it can be used in a sentence.
    const jobType = this.props.location.state.job.jobType.split('_').join(' ')

    const confirmationPage = (
      <>
        <div className="confirmation-page-wrapper">
          <div className="confirmation-page-greeting">
            <h1>Hello, {user.client_name}!</h1>
            <p>Your quote:</p>
            <span>${quote}</span>

            <span className="down-arrow" onClick={this.scrollDown}>&#8595;</span>
          </div>
        </div>

        <div className="confirmation-quote-breakdown" ref={this.infoRef}>
          <h2>Down to the Nitty Gritty</h2>
          <p>Our rate for a {jobType} job is ${job.jobRate}/hr. Since we average about 2ft&sup2;/min for a {jobType} job, we can estimate a time and price using the area you provided us with. Here's a breakdown of your quote:</p>
          <span>
          ${job.jobRate}/hr X {time}hrs = ${quote}
          </span>
          <p>This is just an estimate based off of our average time/costs. We'll only charge for the time it takes us to finish!</p>

          <div className="confirmation-buttons">
            <button>
              <Link to="/quote">No thanks.</Link>
            </button>

            <button
              className="confirm-quote-button"
              onClick={this.initPopup}
            >
              Let's go!
            </button>
          </div>
        </div>
      </>
    );

    // When image is loaded, render the confirmation page
    if (this.state.showPopup) {
      return(
        <div className="signup-backdrop">
          <SignUpForm
            user={user}
            job={job}
            quote={quote}
            fullPrice={fullPrice}
          />
        </div>
      );
    }
    else if (this.state.loadComplete) {
      return confirmationPage
    }
    // Render loading page while waiting for images to fully load.
    else {
      return (
        <>
          <LoadingPage />

          <div className="hidden">
            <img src={image} alt="hidden for loading" onLoad={this.onLoad}/>
          </div>
        </>
      );
    }
  }
}

export default withRouter(QuoteConfirmation)
