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

        <label>Please Select a Job</label>
        <select className="job-dropdown" name="jobType" onChange={(event) => this.props.handleChange(event)}>
          <option value="Landscaping">Landscaping</option>
          <option value="Weeding">Weeding</option>
          <option value="Lawn_Care">Lawn Care</option>
          <option value="Garden_Clearance">Garden Clearance</option>
          <option value="Weed_Wacking">Weed Wacking</option>
          <option value="Grass_Installation">Grass Installation</option>
          <option value="Trimming_and_Pruning">Trimming & Pruning</option>
          <option value="Mulching">Mulch</option>
        </select>

        <label>Name</label>
        <input name="name" type="text" placeholder="John Doe" onChange={(event) => this.props.handleChange(event)} className="quote-input" required/>

        <label>Email</label>
        <input name="email" type="text" placeholder="example@email.com" onChange={(event) => this.props.handleChange(event)} className="quote-input" required/>

        <label>Phone Number</label>
        <input name="phone" type="tel" placeholder="555-555-5555" onChange={(event) => this.props.handleChange(event)} className="quote-input" required/>

        <label>Address</label>
        <input name="address" type="text" placeholder="Address" value={this.props.address} onChange={(event) => this.props.handleChange(event)} className="quote-input" required/>

        <button className="get-quote-button" type="submit">Get Quote</button>
      </form>
    )
  }
}
