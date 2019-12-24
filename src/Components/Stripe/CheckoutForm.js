import React, { useState } from 'react'

import { Redirect } from 'react-router';

import StripeCheckout from 'react-stripe-checkout';
import { injectStripe } from 'react-stripe-elements';

import { makeDeposit } from './../../Api/chargeApi';
import { updateJob } from './../../Api/jobApi';

function checkoutForm({ user, price, job, typeDeposit }) {
  let [paymentComplete, setPaymentComplete] = useState(false);
  let [jobConfirmation, setJobConfirmation] = useState('');

  async function submit(ev) {
    const token = ev.id

    try {
      await makeDeposit(token, price)

      const jobConfirmation = await updateJob(job, user.userId)

      setJobConfirmation(jobConfirmation)
      setPaymentComplete(true)
    }
    catch(err) {
      console.log(err)
    }
  }

    if (paymentComplete)
    return (
      <Redirect
        to={{
          pathname: '/',
          state: {
            userId: user.userId,
            job: jobConfirmation,
          }
        }}
      />
    );
    return (
      <StripeCheckout
        amount={Number.parseInt(price)}
        name="Roger's Snow Removal & Landscaping LLC"
        stripeKey="pk_test_aHCGfI44J5xIBeYr3aptiYw700c4gxEais"
        email={user.client_email}
        token={(ev) => submit(ev)}
      >
        <button className="payment-button">
          { typeDeposit ? 'Make deposit' : 'Pay in full' }
        </button>
      </StripeCheckout>
    );
}

export default injectStripe(checkoutForm)
