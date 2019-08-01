import React, { Component } from 'react';
import { withRouter } from 'react-router';
import LoadingPage from './LoadingPage';

import image from './../images/cut-grass.jpg';

class QuoteConfirmation extends Component {
  constructor(props) {
    super(props)
    this.infoRef = React.createRef();

    this.state = {
      loadComplete: false
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

  render() {
    const { name, jobRate, quote, time } = this.props.location.state

    // Truncate numbers to 2 decimal places for readability
    // const quote = this.props.location.state.quote.toFixed(2)
    // 
    // const time = this.props.location.state.time.toFixed(2)

    // Remove underscores ( _ ) from jobType and make it lowercase
    // so it can be used in a sentence.
    const jobType = this.props.location.state.jobType.split('_').join(' ')

    console.log('**CONIFRmATION STATE**', this.props.location.state)

    const confirmationPage = (
      <>
        <div className="confirmation-page-wrapper">
          <div className="confirmation-page-greeting">
            <h1>Hello, {name}!</h1>
            <p>Your quote:</p>
            <span>${quote}</span>

            <span className="down-arrow" onClick={this.scrollDown}>&#8595;</span>
          </div>
        </div>

        <div className="confirmation-info" ref={this.infoRef}>
          <h2>Down to the Nitty Gritty</h2>
          <p>Our rate for a {jobType} job is ${jobRate}/hr. Since we average about 2ft&sup2;/min for a {jobType} job, we can estimate a time and price using the area you provided us with. Here's a breakdown of your quote:</p>
          <span>
          ${jobRate}/hr X {time}hrs = ${quote}
          </span>
          <p>This is just an estimate based off of our average time/costs. We'll only charge for the time it takes us to finish!</p>

          <div className="confirmation-buttons">
            <button>No thanks.</button>

            <button>Let's go!</button>
          </div>
        </div>
      </>
    );

    // Render loading page while waiting for images to fully load.
    // When image is loaded, render the confirmation page
    if (this.state.loadComplete) {
      return confirmationPage
    } else {
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
