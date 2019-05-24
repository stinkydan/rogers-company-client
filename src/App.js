import React, { Component } from 'react';
import Nav from './Layout/Nav'
import Hero from './Layout/Hero'
import Info from './Layout/Info'
import Services from './Layout/Services'
import Quote from './Layout/Quote'

import { Route } from 'react-router-dom'

import './App.scss';

class App extends Component {
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
          path="/quote"
          render={() =>  <Quote /> } />
      </>
    );
  }
}

export default App;
