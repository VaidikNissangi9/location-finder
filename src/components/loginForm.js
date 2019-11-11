import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom'
import { login } from './auth';
import { connect } from 'react-redux'
import { checkLoginCredentials } from '../actions/loginActions'
import ls from 'local-storage'
import PropTypes from 'prop-types'
import { Login } from './login';

const useStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

/**
 * login form component
 * @param {*} props 
 */
const LogIn = (props) => {

  useEffect(() => {
    if (ls.get('isAuthenticated')) {
      login(() => props.history.push('/home'))
    }
  })

  function handleUserNameChange(event) {
    props.setUsername(event.target.value)
  }

  function handlePasswordChange(event) {
    props.setPassword(event.target.value)
  }

  function handleSubmit() {
    let username = props.username
    let password = props.password
    const credentials = JSON.stringify({ username, password });

    props.checkLoginCredentials(credentials);

  }
  const { classes } = props;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate autoComplete="off" >
          <TextField
            onChange={handleUserNameChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={handlePasswordChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            onClick={handleSubmit}

            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>

        </form>
      </div>

    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    password: state.password,
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUsername: username => {
      dispatch({
        type: "SET_USERNAME",
        username
      })
    },
    setPassword: password => {
      dispatch({
        type: "SET_PASSWORD",
        password
      })
    },
    checkLoginCredentials: (credentials) => { checkLoginCredentials(credentials, dispatch) }
  }
}

Login.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  setPassword: PropTypes.func,
  setUsername: PropTypes.func
}

export default withStyles(useStyles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(LogIn)))