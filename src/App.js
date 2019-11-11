import React, { Component } from 'react';
import './App.css';
// import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import LocationFinder from './components/locationFinder';
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <LocationFinder />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
