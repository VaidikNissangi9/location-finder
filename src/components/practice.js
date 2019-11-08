import React, { useState, useEffect } from 'react'
import PublicMap from './publicMap'
import axios from 'axios';
import { Link } from 'react-router-dom';
import auth from './auth'
import Navbar from './Navbar'
import { Grid, Button, TableSortLabel } from '@material-ui/core';
import * as actions from '../actions/actions'
import {connect} from 'react-redux'

const styles = {
    marginTop: "30px",
    width: "calc(73vw )",
    height: "calc(82vh - 5px)",
    position: "absolute"
};

 const locations=(props)=> {
    const [currentLocation, setCurrentLocation] = useState({});
    const [check, setCheck] = useState(false)

    useEffect(()=> {
        axios.get('http://localhost:3001/locations', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "fake-access-token"
            }
        }).then(res => props.getLocations(res.data)).catch(error => console.log(error))
    })

    function handleOnClickLocation (coordinates) {
        setCurrentLocation(coordinates);
        setCheck(true)
    }

    function handleSort (locations) {
        props.reverseLocations(locations)
    }


        if (props.locations.length === 0) {
            return <div></div>
        }
        else {
            return (
                
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Navbar onSubmit={() => {
                                auth.logout(() => {
                                    props.history.push("/");
                                });
                            }} log="Logout" type="Add Location" showList={() => {
                                props.history.push("/locations/new")
                            }} />
                        </Grid>
                        <Grid item container direction="column" alignItems="center" xs={3}>
                            <TableSortLabel onClick={() => handleSort(props.locations)}>Sort</TableSortLabel>
                            {props.locations.map( (location,index) => (
                                <Grid item key={index}>
                                    <Link to={'/locations/' + location.id}
                                        onClick={() => handleOnClickLocation(location)} >
                                        <Button >
                                            {'Latitute:' + location.lat + ' ,Longitude:' + location.lng}
                                        </Button>
                                    </Link>
                                </Grid>))
                            }
                        </Grid>
                        <Grid item xs={9}>
                            <PublicMap styles={styles} coordinates={currentLocation} check={check}  />
                        </Grid>
                    </Grid>
                </div>
            )
        }
    }
const mapStateToProps = (state) => {
    return {
        locations:state.locations
    }
  };

  const mapDispatchToProps=dispatch=>{
      return{
          getLocations: locations=>{
              dispatch({
                  type:"getLocations",
                  locations
              })
          },
        reverseLocations:locations=>{
            dispatch({
                type:"reverseLocations",
                locations:locations.reverse()
            })
        }
      }
  }

  
export default  connect (mapStateToProps,mapDispatchToProps)(locations);