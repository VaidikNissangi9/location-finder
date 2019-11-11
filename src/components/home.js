import React from 'react'
import Navbar from './Navbar'
import { logout } from './auth'


const home = (props) => {
  return (
    <React.Fragment>
      <Navbar onSubmit={() => {
        logout(() => {
          props.history.push("/");
        });
      }} log='Logout' type='locations' showList={() => {
        props.history.push("/locations")
      }} />
    </React.Fragment>
  )
}

export default home
