import React, { Component } from 'react'

import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

import StripeCheckout from 'react-stripe-checkout';
import { injectStripe } from 'react-stripe-elements';

import { makeDeposit } from './../Api/chargeApi';
import { createJob } from './../Api/jobApi';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      jobConfirmation: ''
    };
    this.submit = this.submit.bind(this);
  }


async submit(ev) {
  const token = ev.id

  const { userId, deposit, userToken, job, depositForStripe } = this.props
  console.log(deposit, 'DEPOSIT FROM PROPS')

  console.log(depositForStripe, "DEPOSIT FOR STRIPE")

  try {
    await makeDeposit(token, depositForStripe)

    const jobConfirmation = await createJob(userId, userToken, job)

    this.setState({ jobConfirmation: jobConfirmation, complete: true })
  }
  catch(err) {
    console.log(err)
  }
}

  render() {
    if (this.state.complete)
    return (
      <Redirect
        to={{
          pathname: '/',
          state: {
            userId: this.props.userId,
            job: this.state.jobConfirmation,
          }
        }}
      />
    );
    return (
      <StripeCheckout
        amount={Number.parseInt(this.props.price)}
        name="Roger's Snow Removal & Landscaping LLC"
        stripeKey="pk_test_aHCGfI44J5xIBeYr3aptiYw700c4gxEais"
        email={this.props.user.client_email}
        token={this.submit}
      >
        <button className="payment-button">
          Let's Go!
        </button>
      </StripeCheckout>
    );
  }
}

export default withRouter(injectStripe(CheckoutForm));
