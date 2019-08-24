import React, { Component } from 'react'
import { Redirect } from 'react-router'
import StripeCheckout from 'react-stripe-checkout';
import { injectStripe } from 'react-stripe-elements';

import LoadingPage from './../Layout/LoadingPage';

import axios from 'axios';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }


async submit(ev) {
  console.log('EVENT ON SUBMIT', ev)
  return axios({
    url: "http://localhost:4741/charges",
    method: 'POST',
    headers: {"Content-Type": "Application/json"},
    data: {
      job: {
        token: ev.id,
        price: Number.parseInt(this.props.price),
        fullPrice: this.props.fullPrice
      }
    }
  }).then((res) => {
    console.log(res)
    this.setState({ complete: true })
  })
  .catch((err) => console.log(err));
}

  render() {
    if (this.state.complete) return (
      <>
        <LoadingPage />
        <Redirect
          to='/scheduling'
        />
      </>
    );
    return (
      <StripeCheckout
        amount={Number.parseInt(this.props.price)}
        billingAddress
        name="Roger's Snow Removal & Landscaping LLC"
        stripeKey="pk_test_aHCGfI44J5xIBeYr3aptiYw700c4gxEais"
        token={this.submit}
      >
        <button className="stripe-button-custom">
          Let's go!
        </button>
      </StripeCheckout>
    );
  }
}

export default injectStripe(CheckoutForm);
