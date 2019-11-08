import React, { useState} from "react";
// import mapboxgl from "mapbox-gl";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Navbar from './Navbar'
import axios from 'axios'
import auth from "./auth";
import { Snackbar } from "@material-ui/core";
import {connect} from 'react-redux'
import PublicMap from './publicMap'



const addLocation = (props) => {

  const [isSnackbarOpen, setisSnackbarOpen] = useState(false);
  const handleClose = () => {
    setisSnackbarOpen(false)
  };
  const [message, setMessage] = useState("")


  function handleAddLocation() {
    let center={lng:props.center[0],lat:props.center[1]}

    axios.post("http://localhost:3001/locations",center , {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "fake-access-token"
      }
    }).then(reponse => {
      setMessage('success')
      setisSnackbarOpen(true)
  
    }).catch(error => setMessage('error'))
  }
  return (
    <div>

      <Navbar log="logout" type="add" showList={handleAddLocation} onSubmit={() => {
        auth.logout(() => {
          props.history.push("/");
        });
      }} />
      <React.Fragment>
        <div id='menu'>
          <div >
            {"Lat:" + props.center[0] + " Lng: " + props.center[1]}
          </div>
          <PublicMap/>
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
const mapStateToProps=(state)=>{
  return{
    center:state.center
  }
}

const mapDispatchToProps = dispatch => {
  return {
      getCenter:center=>{
          dispatch({
              type:"getCenter",
              center
          })
      }
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (addLocation)