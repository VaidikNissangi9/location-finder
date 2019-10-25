import React,{Component} from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken="pk.eyJ1Ijoic21peWFrYXdhIiwiYSI6ImNqcGM0d3U4bTB6dWwzcW04ZHRsbHl0ZWoifQ.X9cvdajtPbs9JDMG-CMDsA";

export default class App extends Component {
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-96, 37.8], 
      zoom: 3      
    });
    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true
      }));
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const style ={
      position: 'absolute',
      top: "65px",
      bottom: "2px",
      width: '100%'
    };

    return <div style={style} ref={el => this.mapContainer = el} />;
  }
}
/* 
import React, { Component } from "react";
import ReactMapGL, {GeolocateControl} from "react-map-gl";
const token="pk.eyJ1IjoidmFpZGlrIiwiYSI6ImNrMXVpMWt4NTExbmszbmxpeXZ1aW4wMjAifQ.KIKoZq9sz4k-2Zmf_Hp0gg"
const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10,
};

export default class Map extends Component {
  state = {
    viewport: {longitude: -122.45, latitude: 37.78, zoom: 14},
    searchResultLayer: null
  }
  
  render() {
    const {viewport} = this.state;
    return (
      <ReactMapGL {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        width="100vw"
        height="90vh"
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={token}
        >
        <GeolocateControl 
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
        
      </ReactMapGL>
    );
  }
}

-----------------map

import React, { useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

mapboxgl.accessToken = "pk.eyJ1IjoiYnJpYW5iYW5jcm9mdCIsImEiOiJsVGVnMXFzIn0.7ldhVh3Ppsgv4lCYs65UdA";

const MapboxGLMap = (props) => {
  const mapContainer = useRef();
  
  const [map, setMap] = useState(new mapboxgl.Map({
    container: mapContainer,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.50, 40],
    zoom: 9
  }));

  let { coordinates } = props;
  if (!coordinates.lat || !coordinates.lng) {
    coordinates = {
      lng: -96,
      lat: 36.5
    }
  }
  console.log(coordinates, props)
  map.flyTo({
    center: [coordinates.lng, coordinates.lat]
  });

  return (
    <React.Fragment>
      <div ref={el => (mapContainer.current = el)} style={props.styles} />
      <div id='menu'>
        <input id='streets-v11' type='radio' name='rtoggle' value='streets' defaultChecked onClick={() => this.setState({ mapType: "streets-v11" })} />
        streets
          <input id='satellite-v9' type='radio' name='rtoggle' value='satellite' onClick={() => this.setState({ mapType: "satellite-v9" })} />
        satellite
        </div>
    </React.Fragment>
  );
};
MapboxGLMap.defaultProps = {
  styles: {
    marginTop: "20px",
    width: "calc(99.5vw )",
    height: "calc(87vh - 5px)",
    position: "absolute"
  },
  coordinates: {
    lng: -96,
    lat: 36.5
  }
}
export default MapboxGLMap;





*/




import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Navbar from './Navbar';
import auth from './auth'
import { Link } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    h1:{
        color:"#111",
    }
}));

const Locations = (props) => {
    const classes = useStyles();
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/locations', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "fake-access-token"
            }
        }).then(res => setLocations(res.data)).catch(error => console.log(error))
    }
    )
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Navbar onSubmit={() => {
                        auth.logout(() => {
                            props.history.push("/");
                        });
                    }} log="Logout" disable={true} />
                </Grid>
                <Grid item container direction="column" xs={3}>
                    <h1 > Locations</h1>
                    {locations.map(location => (
                        <Paper key={location.id} className={classes.paper} >
                            <Link to={'/locations/' + location.id}> {'Latitute:' + location.lat + ' ,Longitude:' + location.lng} </Link>
                        </Paper>
                    )
                    )
                    }
                </Grid>
                <Grid item xs={9}>
                    { <Paper className={classes.paper}>xs=6</Paper> }
                    </Grid>
                    </Grid>
                </div>
            );
        }
        export default Locations




import React, { Component } from 'react'
import PublicMap from './publicMap'
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Paper } from '@material-ui/core';
export default class locations extends Component {
    state = {
        locations: []
    }
    componentDidMount() {
        axios.get('http://localhost:3001/locations', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "fake-access-token"
            }
        }).then(res => this.setState({ locations: res.data })).catch(error => console.log(error))
    }

    render() {
        if (this.state.locations.length === 0) {
            return <div></div>
        }
        else {
            return (
                <div>
                    <div className='sidebar pad2'>
                        <div className='heading'>
                            <h1>Secret locations</h1>
                            <input id='search' type='text' placeholder='Search here....' />
                        </div>
                        <div id='listings' className='listings'>
                            {this.state.locations.map(location => (
                                <Paper key={location.id} className="item" >
                                   <Link to={'/locations/' + location.id}> {'Latitute:'+ location.lat +' ,Longitude:'+ location.lng} </Link>
                                </Paper>
                            )
                            )
                            }
                        </div>
                    </div>
                    <div id='map' className='map pad2'>
                        <PublicMap />
                    </div>
                </div>
            )
        }
    }
}
