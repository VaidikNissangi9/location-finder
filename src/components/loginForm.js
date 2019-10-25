import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import auth from './auth';
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

class LogIn extends Component {
  state = {
    username: "",
    password: "",
    accessToken: ""
  }
  handleUserNameChange = (event) => {
    this.setState({
      username: event.target.value
    })
  }
  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }
  handleSubmit = () => {
    const username = this.state.username;
    const password = this.state.password;
    const credentials = JSON.stringify({ username, password });

    axios.post('http://localhost:3001/login', credentials,
      {
        headers: { "Content-Type": "application/json" }
      }).then((response) => {
        // console.log(response.data)
        if (response.data.access_token) {
          auth.login(() => this.props.history.push('/home'))
        }
      }).catch(error => console.log('error'))
  }
  render() {
    const { classes } = this.props;
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
              onChange={this.handleUserNameChange}
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
              onChange={this.handlePasswordChange}
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
              onClick={this.handleSubmit}

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
}
export default withStyles(useStyles)(withRouter(LogIn))