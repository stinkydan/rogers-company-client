import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { HashRouter } from 'react-router-dom'
import ScrollToTop from './Hooks/ScrollToTop'


const appJsx = (
  <HashRouter>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </HashRouter>
)

ReactDOM.render(appJsx, document.getElementById('root'))
