import React, { Component } from 'react'
import { LandingPage } from './landing.page'
import { Login } from './login';
import { Route } from 'react-router-dom';
import { ProtectedRoute } from './protectedRoute';
import Home from './home';
import Locations from './locations'
import AddLocation from './addLocation';
// import Map from './Navbar'
export default class LocationFinder extends Component {
    state = {
        userAuthenticated: false
    }
    render() {
        return (
            <React.Fragment>
                <Route exact path={["/", "/maps"]} component={LandingPage} />
                <Route exact path="/login" component={Login} />
                <ProtectedRoute exact path="/home" component={Home} />
                <Route path={["/locations/:id", "/locations"]} render={(props) => {
                    // console.log(props.match.params.id)
                    switch (props.match.params.id) {
                        case "new": return <AddLocation {...props} />;
                        default: return <Locations {...props} />;
                    }
                }} />
            </React.Fragment>

        )
    }
}
