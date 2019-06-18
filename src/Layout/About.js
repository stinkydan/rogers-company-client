import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class About extends Component {
  render() {
    return (
      <>
        <div className="about-container">
          <div className="about-block">
            <div className="about-text">
              <h1>ROGER'S LANDSCAPING SERVICES</h1>
              <h2>With Us the Grass is Greener</h2>
              <p>Roger's Landscaping Services has been exceeding the expectations of Greater Boston residents. Dedication to our clients, team members and the green industry is exemplified through our quest for excellence. We pride ourselves on our excellent communication, efficiency, and reasonable prices.
                <br/><br/>We provide the following services:
              </p>
              <ul>
                <li>Weeding</li>
                <li>Trimming</li>
                <li>Mowing</li>
                <li>Raking</li>
                <li>Mulching</li>
                <li>Yard Cleanup</li>
              </ul>
            </div>
            <img alt="bush-trimmer" src="https://static.wixstatic.com/media/d99169_7388fedba3ab44e4ad8ffe1d05a1117b~mv2_d_4608_3072_s_4_2.jpg/v1/fill/w_735,h_1082,al_c,q_85,usm_0.66_1.00_0.01/d99169_7388fedba3ab44e4ad8ffe1d05a1117b~mv2_d_4608_3072_s_4_2.webp"/>
          </div>
          <div className="about-block">
            <img alt="lawn mower" src="https://static.wixstatic.com/media/d99169_52d1d64a2a084379a42689b9cb93866d~mv2_d_4608_3072_s_4_2.jpg/v1/fill/w_858,h_657,al_c,q_85,usm_0.66_1.00_0.01/d99169_52d1d64a2a084379a42689b9cb93866d~mv2_d_4608_3072_s_4_2.webp"/>
            <div className="about-cta">
              <h2>Get a Free Quote Now!</h2>
              <Link to="/quote"><button>Contact Us</button></Link>
              <p>Or Call Us:  808-722-6288</p>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default About
