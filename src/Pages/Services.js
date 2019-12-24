import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Services extends Component {

  render() {
    return (
      <>
        <div className="page-container">
            <h1>Services</h1>
          <div className="service-container">
            <div className="service-block">
              <img src="https://static.wixstatic.com/media/d99169_e2fc773bae2349f9b53dc12622538e94~mv2_d_2700_1800_s_2.jpg/v1/fill/w_300,h_200,al_c,q_80,usm_0.66_1.00_0.01/d99169_e2fc773bae2349f9b53dc12622538e94~mv2_d_2700_1800_s_2.webp" alt="House"/>
              <div className="book-service">
                <h2>Landscaping</h2>
                <h3>2hr | $100.00</h3>
                <Link
                 to="/quote">
                  <button className="book-button">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
            <div className="service-block">
              <img src="https://static.wixstatic.com/media/6f013e_8e06b157b49741c5b31283f63c98db76~mv2.jpg/v1/fill/w_300,h_200,al_c,q_80,usm_0.66_1.00_0.01/6f013e_8e06b157b49741c5b31283f63c98db76~mv2.webp" alt="Picking Weeds"/>
              <div className="book-service">
                <h2>Weeding</h2>
                <h3>1hr | $50.00</h3>
                <Link
                 to="/quote">
                  <button className="book-button">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
            <div className="service-block">
              <img src="https://static.wixstatic.com/media/d99169_786faa15e4af47659db8e9d2e9bc1037~mv2_d_5656_3933_s_4_2.jpg/v1/fill/w_300,h_200,al_c,q_80,usm_0.66_1.00_0.01/d99169_786faa15e4af47659db8e9d2e9bc1037~mv2_d_5656_3933_s_4_2.webp" alt="Lawn Mower"/>
              <div className="book-service">
                <h2>Lawn Care</h2>
                <h3>1hr | $50.00</h3>
                <Link
                 to="/quote">
                  <button className="book-button">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
            <div className="service-block">
              <img src="https://static.wixstatic.com/media/d99169_bf6079e5374b440d910661d61b5f28ac~mv2_d_2896_1944_s_2.jpg/v1/fill/w_300,h_200,al_c,q_80,usm_0.66_1.00_0.01/d99169_bf6079e5374b440d910661d61b5f28ac~mv2_d_2896_1944_s_2.webp" alt="Wheelbarrow"/>
              <div className="book-service">
                <h2>Garden Clearance</h2>
                <h3>1hr | $50.00</h3>
                <Link
                 to="/quote">
                  <button className="book-button">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
            <div className="service-block">
              <img src="https://static.wixstatic.com/media/d99169_2e650148adcc49fa9cbe7ac24361ec14~mv2_d_4608_3072_s_4_2.jpg/v1/fill/w_300,h_200,al_c,q_80,usm_0.66_1.00_0.01/d99169_2e650148adcc49fa9cbe7ac24361ec14~mv2_d_4608_3072_s_4_2.webp" alt="Weedwacker"/>
              <div className="book-service">
                <h2>Weed Wacking</h2>
                <h3>1hr | $40.00</h3>
                <Link
                 to="/quote">
                  <button className="book-button">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
            <div className="service-block">
              <img src="https://static.wixstatic.com/media/d99169_10c47dcda6e14dcda3a39b062c025e49~mv2_d_6000_4000_s_4_2.jpg/v1/fill/w_300,h_200,al_c,q_80,usm_0.66_1.00_0.01/d99169_10c47dcda6e14dcda3a39b062c025e49~mv2_d_6000_4000_s_4_2.webp" alt="Grass"/>
              <div className="book-service">
                <h2>Grass Installation</h2>
                <h3>4hr | $200.00</h3>
                <Link
                 to="/quote">
                  <button className="book-button">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
            <div className="service-block">
              <img src="https://static.wixstatic.com/media/6f013e_a1495ea7533b42bda1b609a0ac991d4b~mv2.jpg/v1/fill/w_300,h_200,al_c,q_80,usm_0.66_1.00_0.01/6f013e_a1495ea7533b42bda1b609a0ac991d4b~mv2.webp" alt="Grass"/>
              <div className="book-service">
                <h2>Trimming & Pruning</h2>
                <h3>1hr | $50.00</h3>
                <Link
                 to="/quote">
                  <button className="book-button">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
            <div className="service-block">
              <img src="https://static.wixstatic.com/media/a3a84b47b3694d23a4631120d21417cf.jpg/v1/fill/w_300,h_200,al_c,q_80,usm_0.66_1.00_0.01/a3a84b47b3694d23a4631120d21417cf.webp" alt="Grass"/>
              <div className="book-service">
                <h2>Mulch</h2>
                <h3>1hr | $200.00</h3>
                <Link
                 to="/quote">
                  <button className="book-button">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Services
