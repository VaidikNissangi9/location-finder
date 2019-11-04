import React, { Component } from 'react'
import PublicMap from './publicMap'
import axios from 'axios';
import { Link } from 'react-router-dom';
import auth from './auth'
import Navbar from './Navbar'
import { Grid, Button, TableSortLabel } from '@material-ui/core';

const styles = {
    marginTop: "30px",
    width: "calc(73vw )",
    height: "calc(82vh - 5px)",
    position: "absolute"
};

export default class locations extends Component {
    state = {
        locations: [],
        currentLocation: {},
        sort: false,
        check:false
    }
    componentDidMount() {
        axios.get('http://localhost:3001/locations', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "fake-access-token"
            }
        }).then(res => this.setState({ locations: res.data })).catch(error => console.log(error))
    }

    handleOnClickLocation = (coordinates) => {
        this.setState({
            currentLocation: coordinates,
            check:true  
        })

    }

    handleSort = () => {
        this.setState({
            locations: this.state.locations.reverse()
        })
    }

    render() {
        if (this.state.locations.length === 0) {
            return <div></div>
        }
        else {
            return (
                
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Navbar onSubmit={() => {
                                auth.logout(() => {
                                    this.props.history.push("/");
                                });
                            }} log="Logout" type="Add Location" showList={() => {
                                this.props.history.push("/locations/new")
                            }} />
                        </Grid>
                        <Grid item container direction="column" alignItems="center" xs={3}>
                            <TableSortLabel onClick={() => this.handleSort()}>Sort</TableSortLabel>
                            {this.state.locations.map(location => (
                                <Grid item key={location.id}>
                                    <Link to={'/locations/' + location.id}
                                        onClick={() => this.handleOnClickLocation(location)} >
                                        <Button >
                                            {'Latitute:' + location.lat + ' ,Longitude:' + location.lng}
                                        </Button>
                                    </Link>
                                </Grid>))
                            }
                        </Grid>
                        <Grid item xs={9}>
                            <PublicMap styles={styles} coordinates={this.state.currentLocation} check={this.state.check}  />
                        </Grid>
                    </Grid>
                </div>
            )
        }
    }
}
