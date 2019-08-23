import React, { Component } from 'react';
import Nav from './Layout/Nav'
import Hero from './Layout/Hero'
import Info from './Layout/Info'
import Services from './Layout/Services'
import Quote from './Layout/Quote'
import About from './Layout/About'
import Testimonials from './Layout/Testimonials'
import GalleryPage from './Layout/GalleryPage'
import QuoteConfirmation from './Layout/QuoteConfirmation'
import Scheduling from './Layout/Scheduling'

import Footer from './Layout/Footer'

import { Route } from 'react-router-dom'

import getKey from './Api/getKey'

import './App.scss';

class App extends Component {
  constructor() {
    super()
    this.state = {
      apiKey: false
    }
  }

  componentDidMount() {
    getKey()
      .then(res =>
      {
        console.log(res)
        this.setState({ apiKey: res.data.googleKey })
      }
    ).catch(err => console.log(err, 'ERR GETKEY'))
  }

  render() {
    return (
      <>
        <Route
          path="/"
          render={() =>  <Nav /> } />

        <Route
          exact path="/"
          render={() => <Hero /> } />

        <Route
          exact path="/"
          render={() => <Info /> } />

        <Route
          exact path="/services"
          render={() => <Services /> } />

        <Route
          exact path="/quote"
          render={() =>  <Quote apiKey={this.state.apiKey} /> } />

        <Route
          exact path="/about"
          render={() =>  <About /> } />

        <Route
          exact path="/testimonials"
          render={() =>  <Testimonials /> } />

        <Route
          exact path="/gallery"
          render={() =>  <GalleryPage /> } />

        <Route
          exact path="/quote-confirmation"
          render={() =>  <QuoteConfirmation /> } />

        <Route
          exact path="/scheduling"
          render={() =>  <Scheduling /> } />

        <Route
          path="/"
          render={() =>  <Footer /> } />
      </>
    );
  }
}

export default App;
