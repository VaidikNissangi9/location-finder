import React, { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
const styles = {
  marginTop: "28px",
  width: "calc(99.5vw )",
  height: "calc(87vh - 5px)",
  position: "absolute"
}

mapboxgl.accessToken = "pk.eyJ1IjoiYnJpYW5iYW5jcm9mdCIsImEiOiJsVGVnMXFzIn0.7ldhVh3Ppsgv4lCYs65UdA";
let marker;
const MapboxGLMap = (props) => {
  const mapContainer = useRef();
  const [map, setMap] = useState(null);
  useEffect(() => {
    var map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-96, 36.5],
      zoom: 9
    });
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
    return () => map.remove()
  }, [])

  if (map !== null) {
    map.on('click', function (event) {
      if (marker != null) {
        marker.remove()
      }
      marker = new mapboxgl.Marker()
        .setLngLat(event.lngLat)
        .addTo(map);
      let center = [event.lngLat.lng, event.lngLat.lat]
      props.getCenter(center)
    })
  }
  if (map != null && props.check) {
    map.flyTo({
      center: props.center
    });
    if (marker != null) {
      marker.remove()
    }
    marker = new mapboxgl.Marker()
      .setLngLat(props.center)
      .addTo(map);
  }

  return (
    <div>
      <div ref={el => (mapContainer.current = el)} style={props.styles || styles} />
      <div className="switch-field">
        <input id='streets-v11' type='radio' name='rtoggle' value='streets' defaultChecked onClick={() => map.setStyle("mapbox://styles/mapbox/streets-v11")} />
        <label htmlFor='streets-v11'>streets</label>
        <input id='satellite-v9' type='radio' name='rtoggle' value='satellite' onClick={() => map.setStyle("mapbox://styles/mapbox/satellite-v9")} />
        <label htmlFor='satellite-v9'>satellite</label>
      </div>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    center: state.center
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCenter: center => {
      dispatch({
        type: "GET_CENTER",
        center
      })
    }
  }
}

MapboxGLMap.propTypes = {
  center: PropTypes.array,
  getCenter: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(MapboxGLMap);

