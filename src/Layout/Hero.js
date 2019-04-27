import React, { Component } from 'react';
import { AwesomeButton } from 'react-awesome-button';
import styles from 'react-awesome-button/src/styles/themes/theme-blue';

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
          <h1 className="hero-title">Serving Greater Boston</h1>
          <AwesomeButton
            cssModule={styles}
            type="primary"
            href="https://greaterbostonsnowremoval.com"
          >
            Looking For Snow Removal?
          </AwesomeButton>
        </div>
      </>
    )
  }
}

export default Hero
