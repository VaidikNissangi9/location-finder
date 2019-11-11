import React, { useState, useEffect } from "react";
// import mapboxgl from "mapbox-gl";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Navbar from './Navbar'
import { logout } from "./auth";
import { Snackbar } from "@material-ui/core";
import { connect } from 'react-redux'
import PublicMap from './publicMap'
import { addLocations } from '../actions/locationsActions'
import PropTypes from 'prop-types'

const addLocation = (props) => {

  const [isSnackbarOpen, setisSnackbarOpen] = useState(false);

  const handleClose = () => {
    setisSnackbarOpen(false)
  };

  const [message, setMessage] = useState("")
  useEffect(() => {
    if (props.locationAdded) {
      setMessage('success')
      setisSnackbarOpen(true)
    }
  }, [props.locationAdded])

  function handleAddLocation() {
    let center = { lng: props.center[0], lat: props.center[1] }
    props.addLocations(center);
  }

  return (
    <div>
      <Navbar log="logout" type="add" showList={handleAddLocation} onSubmit={() => {
        logout(() => {
          props.history.push("/");
        });
      }} />
      <React.Fragment>
        <div id='menu'>
          <div >
            {"Lat:" + props.center[0] + " Lng: " + props.center[1]}
          </div>
          <PublicMap />
        </div>
      </React.Fragment>
      {<Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        key={"top,center"}
        open={isSnackbarOpen}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={message}
      />}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    center: state.center,
    locationAdded: state.locationAdded
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCenter: center => {
      dispatch({
        type: "GET_CENTER",
        center
      })
    },
    addLocations: center => { addLocations(center, dispatch) }
  }
}

addLocation.propTypes = {
  center: PropTypes.array,
  locationAdded: PropTypes.bool,
  getCenter: PropTypes.func,
  addLocations: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(addLocation)