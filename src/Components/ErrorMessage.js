import React, { Component } from 'react';

export default class ErrorMessage extends Component {

componentDidMount() {
  console.log('ERROR MSG MOUNTED')
}

  render() {
    return (
      <div className="error-message">
        <p>
        We're having some trouble calculating your quote. Please check your internet connection and try again.
        </p>
        <span onClick={this.props.dismissMessage}>&times;</span>
      </div>
    );
  }
}
