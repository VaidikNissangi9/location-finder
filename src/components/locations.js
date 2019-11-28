import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PublicMap from './publicMap'
import { Button, TableSortLabel, Grid } from '@material-ui/core';
import { connect } from 'react-redux'
import { fetchLocations } from '../actions/locationsActions'
import { logout } from './auth';
import { Link } from 'react-router-dom';

const styles = {
    marginTop: "40px",
    width: "100%",
    height: "calc(81vh - 5px)",
    position: "absolute",
    display: 'block',

};

const drawerWidth = 245;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'

    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    sort: {
        padding: "19px 100px"
    },
    content: {
        width: "100%",
        flexGrow: 1,
        padding: theme.spacing(3),
        textAlign: 'center'
    },
    title: {
        flexGrow: 1
    }
}));

function locations(props) {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [check, setCheck] = useState(false)
    useEffect(() => {
        props.setLocations();
        // setMobileOpen(!mobileOpen)
    }, [])
    if (props.locations.length !== 0 && !check) {
        const locationId = parseInt(props.match.params.id, 10);
        const location = props.locations.find(obj => obj.id === locationId)
        if (location) handleOnClickLocation(location.lng, location.lat)
    }


    function handleSort(locations) {
        props.reverseLocations(locations)
    }
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    function handleOnClickLocation(lng, lat) {
        setCheck(true)
        let center = [lng, lat]
        props.getCenter(center)
        setMobileOpen(false)
    }

    if (props.locations.length === 0) {
        return <div></div>
    }

    const drawer = (
        <div>
            <div>
                <Divider />
                <TableSortLabel className={classes.sort} onClick={() => handleSort(props.locations)}>Sort</TableSortLabel>
            </div>
            <Divider />
            <Grid container>
                {props.locations.map((location, index) => {
                    return (
                        <Grid item key={index}>
                            <Link to={'/locations/' + location.id}
                                onClick={() => handleOnClickLocation(location.lng, location.lat)} >
                                <Button>
                                    {'Latitute:' + location.lat + ' ,Longitude:' + location.lng}
                                </Button>
                            </Link>
                        </Grid>)
                })
                }
            </Grid>

        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" color="secondary" className={classes.appBar} >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}   >
                        <Button style={{fontSize:"13px"}} color="inherit" onClick={() => props.history.push("/home")} > Location Finder </Button>


                    </Typography>
                    <div className={classes.titles} >
                    <Button style={{fontSize:"13px"}}color="inherit" onClick={() => {
                        props.history.push("/locations/new")
                    }}  >Add Location </Button>
                    <Button style={{fontSize:"13px"}} type="submit" color="inherit" onClick={() => {
                        logout(() => {
                            props.history.push("/");
                        });
                    }}> logout </Button>
                    </div>
                </Toolbar>
            </AppBar>

            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden mdUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <PublicMap styles={styles} check={check} />
            </main>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        locations: state.locations,
        center: state.center
    }
};

const mapDispatchToProps = dispatch => {
    return {
        reverseLocations: locations => {
            dispatch({
                type: "REVERSE_LOCATIONS",
                payload: locations.reverse()
            })
        },
        getCenter: center => {
            dispatch({
                type: "GET_CENTER",
                payload: center
            })
        },
        setLocations: () => fetchLocations(dispatch)
    }
}


locations.propTypes = {
    center: PropTypes.array,
    locations: PropTypes.array,
    getCenter: PropTypes.func,
    reverseLocations: PropTypes.func,
    setLocations: PropTypes.func,
    container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default connect(mapStateToProps, mapDispatchToProps)(locations);
