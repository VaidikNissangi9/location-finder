import React, { Component } from 'react'
import PublicMap from './publicMap'
import axios from 'axios';
import { Link } from 'react-router-dom';
import auth from './auth'
import Navbar from './Navbar'

import { Grid, List, ListItem } from '@material-ui/core';
const styles = {
    marginTop: "20px",
    width: "calc(74vw )",
    height: "calc(84vh - 5px)",
    position: "absolute"
};

export default class locations extends Component {
    state = {
        locations: [],
        currentLocation: {},
        check: false
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
            check: true
        })
    }

    render() {
        if (this.state.locations.length === 0) {
            return <div></div>
        }
        else {
            // console.log(this.props)
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
                        <Grid item container direction="column" alignItems="center" xs={3} spacing={this.state.locations.length}>
                            <List>
                                {this.state.locations.map(location => (
                                    <ListItem  key={location.id}  >
                                        <Link to={'/locations/' + location.id} onClick={() => this.handleOnClickLocation(location)}  > {'Latitute:' + location.lat + ' ,Longitude:' + location.lng}  </Link>
                                    </ListItem>)
                                )
                                }
                            </List>
                        </Grid>
                        <Grid item xs={9}>

                            <PublicMap styles={styles} coordinates={this.state.currentLocation} check={this.state.check} />
                        </Grid>
                    </Grid>
                </div>
            )
        }
    }
}
