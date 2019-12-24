import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class About extends Component {
  render() {
    return (
      <>
        <div className="about-container">
          <div className="about-block">
            <img alt="roger" src="https://img1.wsimg.com/isteam/ip/4edfa86c-355c-458c-9a30-8f08eae22bd5/82c02710-0ada-495a-96e3-fd5edb089abd.jpg/:/cr=t:12.61%25,l:0%25,w:100%25,h:50%25/rs=w:600,h:300,cg:true" />

            <div className="about-text">
              <h2>Reliable and trustworthy snow removal & landscaping service</h2>
              <p>Roger is from Hawai'i where he worked in the energy efficiency and solar energy industry. In New England he took on new challenges in medicine, coding, and web development, as well as starting a new snow removal and landscaping business that is currently thriving.  Roger knows that when you live a busy life, it is hard to find the time to organize and tidy your home or vacation home or rental. Which is why you can rely on Roger and his team to take care of your property so that you can focus on the things that are important to you. Whether it is summer landscaping or winter snow removal, Roger's Snow Removal and Landscaping has you covered.
              </p>
            </div>
          </div>

          <div className="about-block">
            <img alt="lawn mower" src="https://img1.wsimg.com/isteam/ip/4edfa86c-355c-458c-9a30-8f08eae22bd5/1fd5e55d-f534-4be2-b1c6-40a1c131a88b.jpg/:/cr=t:13.91%25,l:0%25,w:100%25,h:66.67%25/rs=w:600,h:300,cg:true"/>
            <div className="about-cta">
              <h2>A finished job you can be happy with</h2>
              <p>Your satisfaction is our priority and we strive to provide a service we are proud of. We are always prepared for any snow removal requirements and will complete your requested tasks in a timely manner with detail and precision, and at a price you'll love.</p>
              <Link to="/quote"><button>FIND OUT MORE</button></Link>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default About
