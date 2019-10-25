import React, { Component } from 'react';
import './App.css';
// import Navbar from './components/Navbar';
import {Switch} from 'react-router-dom';
import LocationFinder from './components/locationFinder';
class App extends Component {
  render() {
    return (
      <React.Fragment>  
        <Switch>
          <LocationFinder/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
