import React, { useState } from 'react';

import {Elements, StripeProvider} from 'react-stripe-elements';

import { Link } from 'react-router-dom';

import CheckoutForm from './Stripe/CheckoutForm';

import DetailButton from './../Hooks/DetailButton';

import { updateJob } from './../Api/jobApi';

export default function quoteDetails({ user, job, monthlyQuote, saltMonthlyQuote, seasonalQuote, saltSeasonalQuote, perVisit, saltPerVisit }) {

  let [showSaltDetails, toggleDetails] = useState(false)
  let [userDecision, setUserDecision] = useState(false)
  let [packageSelection, savePackage] = useState([false])

  function selectPackage(ev) {
    console.log(job, "JOB")
      console.log(user, "USER")
    savePackage(ev)
  }

  async function onConfirm() {
    try {
      const updateRes = await updateJob(job.id, packageSelection)
      console.log(updateRes)
      setUserDecision('continue')
    }
    catch (err) {
      console.log('onconfirm no good', err)
    }
  }

  // Prices toggle logic
  let perVisitTitle = showSaltDetails ? 'Per Visit with Salt' : 'Per Visit'
  let monthlyTitle = showSaltDetails ? 'Monthly Quote with Salt' : 'Monthly Quote'
  let seasonalTitle = showSaltDetails ? 'Seasonal Quote with Salt' : 'Seasonal Quote'

  let perVisitPrice = showSaltDetails ? saltPerVisit.toFixed(2) : perVisit.toFixed(2)
  let monthlyPrice = showSaltDetails ? saltMonthlyQuote.toFixed(2) : monthlyQuote.toFixed(2)
  let seasonalPrice = showSaltDetails ? saltSeasonalQuote.toFixed(2) : seasonalQuote.toFixed(2)

  let monthlyPackageTitle = showSaltDetails ? 'monthlySalt' : 'monthly'
  let seasonalPackageTitle = showSaltDetails ? 'seasonalSalt' : 'seasonal'
  let perVisitPackageTitle = showSaltDetails ? 'perVisitSalt' : 'perVisit'

  if (!userDecision) {
    return (
      <>
        <div className="toggle-price-details button-group">
          <button className={ showSaltDetails ? '' : 'selected' } onClick={() => toggleDetails(false)}>Normal Prices</button>
          <button className={ showSaltDetails ? 'selected' : '' } onClick={() => toggleDetails(true)}>Salt Prices</button>
        </div>


        <div className="quote-details">
        <p>Select a package to continue.</p>

          <DetailButton
            userTitle={monthlyTitle}
            packageTitle={monthlyPackageTitle}
            price={monthlyPrice}
            selectPackage={selectPackage}
            packageSelection={packageSelection}
          />

          <DetailButton
            userTitle={seasonalTitle}
            packageTitle={seasonalPackageTitle}
            price={seasonalPrice}
            selectPackage={selectPackage}
            packageSelection={packageSelection}
          />

          <DetailButton
            userTitle={perVisitTitle}
            packageTitle={perVisitPackageTitle}
            price={perVisitPrice}
            selectPackage={selectPackage}
            packageSelection={packageSelection}
          />
        </div>

        <div className="confirmation-buttons">
          <button><Link to="/" >No thanks.</Link></button>
          <button onClick={() => onConfirm()} className="confirm-quote-button">Let's Go!</button>
        </div>
      </>
    );
  } else if (userDecision === 'continue' && packageSelection) {
    // const fullPrice = packageSelection[1]
    const deposit = packageSelection[1]
    return (
      <>
        <div className="deposit-container">
          <div className="deposit-directions">
            <h3>In order to secure our services, you must complete a minimum of a 50% deposit.</h3>
          </div>
          <StripeProvider apiKey="pk_test_aHCGfI44J5xIBeYr3aptiYw700c4gxEais">
            <Elements>
              <CheckoutForm
                user={user}
                job={job}
                typeDeposit={true}
                package={packageSelection[0]}
                price={deposit.toString().replace('.', '')}
              />
            </Elements>
          </StripeProvider>
        </div>
      </>
    );
  }
}