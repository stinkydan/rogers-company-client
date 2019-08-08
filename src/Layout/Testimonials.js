import React, { Component } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class Testimonials extends Component {

  render() {
    return (
      <>
        <div className="testimonial-page-container">
          <div className="testimonials-container">
            <h1>Testimonials</h1>
            <Carousel
              infiniteLoop
              autoPlay
              showStatus={false}
              showIndicators={false}
              showThumbs={false}
              className="presentation-mode"
            >
              <div className="slide primary">
                <p>Roger has completed the job in an unbelievable speed. I hired him for a lawn mowing and I am very satisfied of his service. I will continue use him as our service provider. He is very easy to communicate and responsible. Highly recommended!</p>
                <h3>Yu Ren C.<br/>Malden, MA<br/>-Yelp</h3>
              </div>
              <div className="slide secondary">
                <p>Roger did a fantastic job on my yard cleanup. He was fast, efficient, punctual, polite and very reasonably priced. He communicated frequently to ensure he was meeting my expectations and he responded immediately to my initial request for a quote. I'll be calling him back for the fall and if I didn't have a snowblower I'd be engaging his services all winter!</p>
                <h3>Mark T.<br/>Medford, MA<br/>-Yelp</h3>
              </div>
              <div className="slide content">
                <p>Roger just did a great job raking and cleaning up our lawn. He and his crew were punctual and did a fantastic job.  I would absolutely use them again. We were running errands during the time they were working, so they sent pics throughout the job to make sure we were seeing what we wanted from their work.</p>
                <h3>Jessie M.<br/>Arlington, Boston, MA<br/>- Yelp</h3>
              </div>
            </Carousel>
            <a target="_blank" rel="noopener noreferrer" href="https://www.yelp.com/biz/rogers-snow-removal-and-landscaping-service-boston-3">Leave a review on Yelp</a>
          </div>
        </div>
      </>
    )
  }
}

export default Testimonials
