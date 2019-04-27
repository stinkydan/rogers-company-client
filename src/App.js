import React, { Component } from 'react';
import Nav from './Layout/Nav'
import Hero from './Layout/Hero'
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
      </>
    );
  }
}

export default App;
