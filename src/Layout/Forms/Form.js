import React, { Component } from 'react'

export default class Form extends Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.address !== nextProps.address) {
      return true
    } else {
      return false
    }
  }

  render() {
    return (
      <form className="quote-form-container" onSubmit={this.props.validateForm}>

        <label>Name</label>
        <input name="name" type="text" placeholder="John Doe" onChange={(event) => this.props.handleChange(event)} className="quote-input" required/>

        <label>Email</label>
        <input name="email" type="text" placeholder="example@email.com" onChange={(event) => this.props.handleChange(event)} className="quote-input" required/>

        <label>Phone Number</label>
        <input name="phone" type="tel" placeholder="555-555-5555" onChange={(event) => this.props.handleChange(event)} className="quote-input" required/>

        <label>Address</label>
        <input name="address" type="text" placeholder="Address" value={this.props.address} onChange={(event) => this.props.handleChange(event)} className="quote-input" required/>

        <label>More Details</label>
        <textarea typography="InputAlpha" rows="2" name="details" type="text" placeholder="Tell us more about your snow removal needs" value={this.props.userComments} onChange={(event) => this.props.handleChange(event)} className="quote-input" />

        <button className="get-quote-button" type="submit">Get Quote</button>
      </form>
    )
  }
}
