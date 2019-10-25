import React, { Component } from "react";
// import auth from "./auth";
import Navbar from './Navbar'
import Map from './publicMap';
// import Container from '@material-ui/core/Container'
// import Grid from '@material-ui/core/Grid';

export class LandingPage extends Component {
  // const classes = useStyles();
  state = {
    showMaps: false
  }
  render() {
    return (
      <div >
        <Navbar
          showMaps={() => { this.setState({ showMaps: true }); this.props.history.push("/maps") }}
          onSubmit={() =>
            this.props.history.push("/login")
          } log='Login' type='maps'
        />
        <div>
          {this.state.showMaps && <Map />}
        </div>

      </div>
    );
  };
}
