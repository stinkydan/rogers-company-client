import React, { useState } from 'react'

import { Redirect } from 'react-router';

import StripeCheckout from 'react-stripe-checkout';
import { injectStripe } from 'react-stripe-elements';

import { createCustomer } from './../../Api/chargeApi';
import { updateJob } from './../../Api/jobApi';

function checkoutForm({ user, price, job, selectedPackage, startTransaction }) {
  let [paymentComplete, setPaymentComplete] = useState(false);
  let [jobConfirmation, setJobConfirmation] = useState('');

  async function submit(ev) {
    const token = ev.id

    try {
      const customerRes = await createCustomer(token, user.id)
      console.log(customerRes, "CUSTOMER STRIPE OBJECT")

      const depositRes = await startTransaction(customerRes.data.quote_user.customer_id, price, selectedPackage)

      console.log(depositRes, 'DEPOSIT RES')

      const jobConfirmation = await updateJob(job, selectedPackage)

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
          Make Payment
        </button>
      </StripeCheckout>
    );
}

export default injectStripe(checkoutForm)
