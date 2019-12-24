import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Redirect } from 'react-router';
import LoadingPage from './../../Util/LoadingPage';
// import CheckoutForm from './../../Stripe/CheckoutForm';

import { signUp, signIn } from './../../Api/signUpApi'

class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.user.client_name,
      email: this.props.user.client_email,
      phone: this.props.user.client_phone,
      address: this.props.user.client_address,
      password: '',
      passwordConfirmation: ''
    }
  }

  async onSubmit(e) {
    e.preventDefault()

    const credentials = {
      client_name: this.state.name,
      client_email: this.state.email,
      client_phone: this.state.phone,
      client_address: this.state.address,
      password: this.state.password,
      password_confirmation: this.state.passwordConfirmation
    }

    try {
      await signUp(credentials)

      const res = await signIn(credentials.client_email, credentials.password)

      this.setState({ userId: res.data.user.id, userToken: res.data.user.token })
    }
    catch {
      console.log('woopsi')
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { name, email, phone, address, password, passwordConfirmation, userId, userToken } = this.state
    const { quote, fullPrice, user, job } = this.props

    const redirect = (
      <>
        <LoadingPage />
        <Redirect
          to={{
            pathname: '/scheduling',
            state: {
              userId: userId,
              user: user,
              job: job,
              userToken: userToken,
              quote: quote,
              fullPrice: fullPrice
            }
          }}
        />
      </>
    );

    if (this.state.userToken) {
      return redirect
    }
    return (
      <form className="signup-form-container" onSubmit={e => this.onSubmit(e)}>

        <label>Name</label>
        <input name="name" type="text" placeholder="John Doe" value={name} onChange={(event) => this.handleChange(event)} className="form-input" required/>

        <label>Email</label>
        <input name="email" type="text" placeholder="example@email.com" value={email} onChange={(event) => this.handleChange(event)} className="form-input" required/>

        <label>Phone Number</label>
        <input name="phone" type="tel" placeholder="555-555-5555" value={phone} onChange={(event) => this.handleChange(event)} className="form-input" required/>

        <label>Address</label>
        <input name="address" type="text" placeholder="Address" value={address} onChange={(event) => this.handleChange(event)} className="form-input" required/>

        <label>Password</label>
        <input name="password" type="text" value={password} onChange={(event) => this.handleChange(event)} className="form-input" required/>

        <label>Confirm Password</label>
        <input name="passwordConfirmation" type="text" value={passwordConfirmation} onChange={(event) => this.handleChange(event)} className="form-input" required/>

        <button className="signup-button" type="submit">Create Account</button>
      </form>
    );
  }
}

export default withRouter(SignUpForm)

// <Redirect
//   to={{
//     pathname: '/scheduling',
//     state: {
//       userId: this.state.userId,
//       job: this.props.job
//     }
//   }}
// />
