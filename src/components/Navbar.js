import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import Map from './publicMap'
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar(props) {
    const classes = useStyles();
    // const [isLogin, setIsLogin] = useState(false);


    return (
        <div className={classes.root}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Location Finder
                    </Typography>
                    <Button color="inherit" onClick={props.showMaps || props.showList}  >{props.type} </Button>
                    <Button type="submit" color="inherit" onClick={props.onSubmit}  >{props.log} </Button>
                </Toolbar>
            </AppBar>

        </div>
    );
}
