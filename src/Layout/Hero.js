import React, { Component } from 'react';
import { AwesomeButton } from 'react-awesome-button';
import styles from 'react-awesome-button/src/styles/themes/theme-rickiest';

class Hero extends Component {
  render() {
    return (
      <>
        <img
        className="hero-img"
        src="https://static.wixstatic.com/media/d99169_052968af867b4f87b57d35f4e4842bc4~mv2_d_4608_2982_s_4_2.jpg/v1/fill/w_1895,h_948,al_t,q_85,usm_0.66_1.00_0.01/d99169_052968af867b4f87b57d35f4e4842bc4~mv2_d_4608_2982_s_4_2.webp"
        alt="Lawn"
        />

        <div className="hero-block">
          <div className="hero-cta">
            <h1 className="hero-title">Serving Greater Boston</h1>
            <AwesomeButton
              className="snow-link-btn"
              cssModule={styles}
              type="secondary"
              releaseDelay="50"
              href="https://greaterbostonsnowremoval.com"
            >Looking For Snow Removal?</AwesomeButton>
            <div className="hero-social-cta">
              <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/rogerssnowremoval/"><img alt="white facebook icon" src="https://static.wixstatic.com/media/23fd2a2be53141ed810f4d3dcdcd01fa.png/v1/fill/w_42,h_42,al_c,q_80,usm_0.66_1.00_0.01/23fd2a2be53141ed810f4d3dcdcd01fa.webp"/></a>
              <a target="_blank" rel="noopener noreferrer" href="https://www.yelp.com/biz/rogers-snow-removal-and-landscaping-service-boston-3"><img alt="white yelp icon" src="https://static.wixstatic.com/media/3ae0375b94ba46fca1f4e6c0f7992fc9.png/v1/fill/w_42,h_42,al_c,q_80,usm_0.66_1.00_0.01/3ae0375b94ba46fca1f4e6c0f7992fc9.webp"/></a>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Hero
