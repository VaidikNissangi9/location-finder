import React from 'react'
import { LandingPage } from './landing.page'
import { Login } from './login';
import { Route } from 'react-router-dom';
import { ProtectedRoute } from './protectedRoute';
import Home from './home';
import Locations from './locations'
import AddLocation from './addLocation';

const LocationFinder = ()=> {  
        return (
            <React.Fragment>
                <Route exact path={["/", "/maps"]} component={LandingPage} />
                <Route exact path="/login" component={Login} />
                <ProtectedRoute exact path="/home" component={Home} />
                <Route path={["/locations/:id", "/locations"]} render={(props) => {
                    switch (props.match.params.id) {
                        case "new": return <ProtectedRoute component={AddLocation} />;
                        default: return <ProtectedRoute component={Locations} />;
                    }
                }} />
            </React.Fragment>

        )
    }
export default LocationFinder
