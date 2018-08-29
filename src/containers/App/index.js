import React, { Component } from 'react';
import Routes from '../../routes';

import './style.css';

import HomePage from '../HomePage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>        
        <div className="main-container">  
          <Routes />
        </div>
      </div>
    );
  }
}

export default App;
