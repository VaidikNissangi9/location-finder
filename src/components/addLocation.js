import React, { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Navbar from './Navbar'
import axios from 'axios'
import auth from "./auth";
import { Snackbar } from "@material-ui/core";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

mapboxgl.accessToken = "pk.eyJ1IjoiYnJpYW5iYW5jcm9mdCIsImEiOiJsVGVnMXFzIn0.7ldhVh3Ppsgv4lCYs65UdA";
const style = {
  position: 'absolute',
  top: "110px",
  bottom: "2px",
  width: '100%'
};
let marker;
// let message="";
const addLocation = (props) => {

  const [isSnackbarOpen, setisSnackbarOpen] = useState(false);
  const handleClose = () => {
    setisSnackbarOpen(false)
  };
  const mapContainer = useRef();
  const [map, setMap] = useState(null);
  const [coordinates, setCoordinates] = useState({ lng: "", lat: "" })
  const [message, setMessage] = useState("")

  useEffect(() => {
    var map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-96, 36.5],
      zoom: 9
    })
    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));
    map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    }));
    setMap(map)
  }, [])

  if (map !== null) {
    map.on('click', function (event) {
      if (marker != null) {
        marker.remove()
      }
      marker = new mapboxgl.Marker()
        .setLngLat(event.lngLat)
        .addTo(map);
      setCoordinates({
        ...coordinates,
        ...event.lngLat
      })
    })
  }
  function handleAddLocation() {
    axios.post("http://localhost:3001/locations", coordinates, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "fake-access-token"
      }
    }).then(reponse => {
      setMessage('success')
      setisSnackbarOpen(true)
      if (marker != null) {
        marker.remove()
      }
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
        <div ref={el => (mapContainer.current = el)} style={style} />
        <div id='menu'>
          <div >
            {"Lat:" + coordinates.lat + " Lng: " + coordinates.lng}
          </div>
          <input id='streets-v11' type='radio' name='rtoggle' value='streets' defaultChecked onClick={() => map.setStyle('mapbox://styles/mapbox/streets-v11')} />
          streets
          <input id='satellite-v9' type='radio' name='rtoggle' value='satellite' onClick={() => map.setStyle('mapbox://styles/mapbox/satellite-v9')} />
          satellite
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

export default addLocation