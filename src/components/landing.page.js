import React from "react";
import Navbar from './Navbar'
import Map from './publicMap';
import ls from 'local-storage'

export const LandingPage = (props) => {
  return (
    <div >
      <Navbar history={() => { props.history.push("/home") }}
        showMaps={() => { props.history.push("/maps") }}
        onSubmit={() =>
          ls.get('isAuthenticated') ? props.history.push("/home") : props.history.push("/login")
        } log='Login' type='maps'
      />
      <div>
        {props.match.path === "/maps" && <Map />}
      </div>

    </div>
  );
};
