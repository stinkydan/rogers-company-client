import React, { Component } from 'react';
import Calendar from 'react-calendar';
import { TimeTile } from './TimeTile';
import { withRouter } from 'react-router';

import {Elements, StripeProvider} from 'react-stripe-elements';

import { checkAvailability } from './../Api/scheduleApi';
import CheckoutForm from './../Stripe/CheckoutForm';

import Popup from "reactjs-popup";

class Scheduling extends Component {
  constructor() {
    super()
    this.state = {
      date: new Date(),
      timeClass: 'time-schedule',
      availableTimes: [],
      completeJob: '',
      userFriendlyTime: ''
    }
  }

  openModal = () => {
    console.log('open modal ran')
    this.setState({ open: true });
  }

  closeModal = () => this.setState({ open: false });

  onChange = date => this.setState({ date })

  async getTimes(day) {
    const { userToken } = this.props.location.state

    const res = await checkAvailability(day, userToken)
      try {
        this.setState({ availableTimes: res.data })
      }
      catch(err) {
        console.log(err)
      }
  }

  clickTime = (time, userFriendlyTime) => {
    const { job } = this.props.location.state

    job.jobTime = time
    job.date = this.state.date

    this.setState({ userFriendlyTime: userFriendlyTime, completeJob: job })
    this.openModal()
  }

  render() {
    const deposit = (this.props.location.state.quote * 0.50).toFixed(2)

    const timeTiles = (
      <>
        {this.state.availableTimes.map(
        time => (
            <TimeTile
              key={Math.random()}
              time={time}
              clickTime={this.clickTime}
            />
          )
        )}
      </>
    );

    const stripeButton = (
      <>
        <StripeProvider apiKey="pk_test_aHCGfI44J5xIBeYr3aptiYw700c4gxEais">
            <Elements>
              <CheckoutForm
                depositForStripe={deposit.toString().replace('.', '')}
                deposit={deposit}
                user={this.props.location.state.user}
                userId={this.props.location.state.userId}
                userToken={this.props.location.state.userToken}
                job={this.state.completeJob}
              />
            </Elements>
        </StripeProvider>
      </>
    );

    return (
      <>
        <div className="schedule-page-container">
          <div className="instructions">
            Choose A Date & Time
          </div>

          <div className="calendar-container">

            <Calendar
              className="calendar"
              calendarType="US"
              onChange={this.onChange}
              onClickDay={(day) => this.getTimes(day)}
              value={this.state.date}
            />

            <div className="time-tile-container">
              {timeTiles}
            </div>
          </div>

            <Popup
              open={this.state.open}
              closeOnDocumentClick
              onClose={this.closeModal}
            >
            <div className="schedule-modal">

              <span className="close" onClick={this.closeModal}>
                &times;
              </span>

              <div className="modal-text">
                <span>Almost there! You've selected:</span>

                <span className="date-time-confirmation">
                  {this.state.date.toDateString()} at {this.state.userFriendlyTime}
                </span>

                <span className="deposit-text">
                  You can confirm this date by completing a ${deposit} deposit.
                </span>
              </div>

              {stripeButton}

            </div>
          </Popup>
        </div>
      </>
    );
  }
}

export default withRouter(Scheduling)

// User is prompted with stripe form (try to prefill as well)
// On payment success- redirect to scheduling and save job info with user id to database

// ** Display available times for near future on home screen **
