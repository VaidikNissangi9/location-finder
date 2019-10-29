import React, { Component } from "react";
import Navbar from './Navbar'
import Map from './publicMap';

export class LandingPage extends Component {
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
