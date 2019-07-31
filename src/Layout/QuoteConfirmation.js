import React, { Component } from 'react';
import { withRouter } from 'react-router';

// import image from './../images/grass-blades.jpg'

class QuoteConfirmation extends Component {
  render() {
    const { name, quote, jobType, jobRate, time } = this.props.location.state

    return (
      <>
        <div className="confirmation-page-wrapper">
          <div className="confirmation-page-greeting">
            <h1>Hello, {name}!</h1>
            <p>Your quote:</p>
            <span>${quote}</span>

            <span className="down-arrow">&#8595;</span>
          </div>
        </div>

        <div className="confirmation-info">
          <h2>Down to the Nitty Gritty</h2>
          <p>Our rate for a {jobType} job is ${jobRate}/hr. Since we average about 2ft&sup2;/min for a {jobType} job, we estimated a time using the area you provided us with. Here's a breakdown of your quote:</p>
          <span>
            {/*INSERT QUOTE FORMULA BREAKDOWN HERE*/}
            {jobRate}/hr X {time}hrs = ${quote}
          </span>
          <p>This is just an estimate based off of our typical times. We'll only charge for the time it takes us to finish!</p>
        </div>

        <div className="confirmation-buttons">
          <button>No thanks.</button>

          <button>Let's go!</button>
        </div>
      </>
    );
  }
}

export default withRouter(QuoteConfirmation)
