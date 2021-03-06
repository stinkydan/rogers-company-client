import React, { useEffect } from 'react';

import sendConfirmationEmail from './../Api/confirmationEmail';

// import LoadingPage from './../Util/LoadingPage';
// import image from ''
// let [loadComplete, setLoadComplete] = useState(false)

function confirmationPage({ user, job }) {
  useEffect(
    () => {
      let emailSent = false

      const sendEmail = async () => {
        try {
          const res = await sendConfirmationEmail(user.email, job.selectedPackage, job.quotePrice);
          console.log(res);
        } catch(err) {
          console.log(err);
        }
      }

      if (!emailSent) {
        sendEmail();
      }

      return () => {
        emailSent = true
      };
    }, []
  );

    const pageJsx = (
      <>
        <div className="confirmation-page-wrapper">
          <div className="confirmation-page-greeting">
            <h2>Thank you for choosing Roger's Snow Removal!</h2>
            <p>Your payment was successful- so, we've added you to our fulfillment list.</p>
            <p>If you'd like to reach out, we've provided contact information in an email confirmation!</p>
            <p></p>
          </div>
        </div>
      </>
    );

    return pageJsx
}

// Render loading page while waiting for images to fully load.
/* else {
  return (
    <>
    <LoadingPage />

    <div className="hidden">
    <img src={image} alt="hidden for loading" onLoad={() => setLoadComplete(true)}/>
    </div>
    </> */

export default confirmationPage
