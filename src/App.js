import React, { Component } from 'react';

import Nav from './Components/Layout/Nav';
import Hero from './Components/Layout/Hero';
import SnowInfo from './Components/Layout/SnowInfo';
// import Services from './Pages/Services';
import Quote from './Pages/Quote';
import About from './Pages/About';
import Testimonials from './Pages/Testimonials';
import GalleryPage from './Pages/GalleryPage';
import QuoteConfirmation from './Components/QuoteConfirmation';
import Scheduling from './Components/Scheduling';

import Footer from './Components/Layout/Footer';

import { Route } from 'react-router-dom';

import getKey from './Api/getKey';

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
          render={() => <SnowInfo /> } />

        {/* <Route
          exact path="/services"
          render={() => <Services /> } /> */}

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
