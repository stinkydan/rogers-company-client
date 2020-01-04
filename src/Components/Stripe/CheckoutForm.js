import React from 'react'

import StripeCheckout from 'react-stripe-checkout';
import { injectStripe } from 'react-stripe-elements';

import { createCustomer } from './../../Api/chargeApi';
import { updateJob } from './../../Api/jobApi';

function checkoutForm({ user, price, job, selectedPackage, startTransaction, handlePaymentComplete }) {
  async function submit(ev) {
    const token = ev.id

    try {
      const customerRes = await createCustomer(token, user.id)
      console.log(customerRes, "CUSTOMER STRIPE OBJECT")

      const depositRes = await startTransaction(customerRes.data.id, price, selectedPackage)

      console.log(depositRes, 'DEPOSIT RES')

      if(depositRes.data.paid === true || depositRes.data.status === 'active') {
        const updateRes = await updateJob(job, selectedPackage)

        handlePaymentComplete(updateRes.data)
      }
    }
    catch(err) {
      console.log(err)
    }
  }

    return (
      <StripeCheckout
        amount={Number.parseInt(price)}
        name="Roger's Snow Removal & Landscaping LLC"
        stripeKey="pk_test_aHCGfI44J5xIBeYr3aptiYw700c4gxEais"
        email={user.email}
        token={(ev) => submit(ev)}
        job={job}
      >
        <button className="payment-button">
          Make Payment
        </button>
      </StripeCheckout>
    );
}

export default injectStripe(checkoutForm)
