import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SnowSite from '../images/snow_removal_site.PNG'

class Nav extends Component {
  constructor() {
    super()
    this.state = {
      isHovering: false
    }
  }

  render() {
    const tooltip = (
      <div className="thumbnail">
        <img src={SnowSite} alt="snow removal website" />
      </div>
    )

    return (
      <>
        <header className="main-nav">
          <svg preserveAspectRatio="xMidYMid meet" viewBox="23 20 162.00625610351562 160" height="35" width="35" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M181.7 76.9c-10.4-34-41.6-56.9-77.6-56.9C59.4 20 23 55.9 23 100s36.4 80 81.1 80c7 0 16.1-1.6 21.3-2.9 9.3-2.2 25.5-11.9 25.5-11.9 20.2-14 32.8-36.7 34-61.2l.1-1.1c.1-1-1-18.5-3.3-26zM131.9 119c-2.3-2.7-4.7-5.4-7.2-7.9-.5-.5-1.1-1-1.6-1.5 13.5-11.8 29.9-19.8 47.4-23.3.8 3.9 1.3 7.9 1.4 11.9-14.8 3.6-28.6 10.7-40 20.8zm-95.8-19c0-3 .3-6.1.7-9.1 29.2-1.7 57.7 9.1 78.6 29.6a99.69 99.69 0 0 1 23.7 36.6c-3.6 2.2-7.4 4-11.4 5.4-4.5-12.2-11.7-23.2-21-32.3-18.4-18.1-44-27.7-70.5-26.4.1-1.2-.1-2.5-.1-3.8zm68-66.8c27 0 51.4 15.9 62.4 40.6-19.9 4.2-38.4 13.7-53.5 27.3-21-15.8-46.6-24-72.8-23.5 9.8-26.8 35.3-44.5 63.9-44.4zM38.5 117c22.3-.7 43.8 7.4 59.2 22.6 7.6 7.4 13.5 16.4 17.4 26.3-3.6.6-7.3.9-10.9 1-30.8 0-57.6-20.4-65.7-49.9zm111.6 32c-2.8-6.8-6.2-13.3-10.3-19.4 8.8-8 19.4-14 30.8-17.3-2.6 14.1-9.8 27-20.5 36.7z" fill="#25352c" data-color="1">
              </path>
            </g>
          </svg>
          <span className="company-name">
          Roger's
          <a
            href="https://greaterbostonsnowremoval.com"
            className="snow-link"
            onMouseEnter={() => this.setState({ isHovering: true })}
            onMouseLeave={() => this.setState({ isHovering: false })}
          > Snow Removal </a>
            and
           <span
           className="landscape-link"
           > Landscaping Services
           </span> LLC</span>
          <div className="call-to-action">
            <span>Contact Us Now</span>
          </div>
        </header>

        {this.state.isHovering ? tooltip : ''}

        <nav className="sub-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/testimonials" className="nav-link">Testimonials</Link>
          <Link to="/gallery" className="nav-link">Gallery</Link>
        </nav>
      </>
    )
  }
}

export default Nav
