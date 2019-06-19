import React, { Component } from 'react';
import Nav from './Layout/Nav'
import Hero from './Layout/Hero'
import Info from './Layout/Info'
import Services from './Layout/Services'
import Quote from './Layout/Quote'
import About from './Layout/About'
import Testimonials from './Layout/Testimonials'
import GalleryPage from './Layout/GalleryPage'
import Footer from './Layout/Footer'

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
          exact path="/quote"
          render={() =>  <Quote /> } />

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
          path="/"
          render={() =>  <Footer /> } />
      </>
    );
  }
}

export default App;
