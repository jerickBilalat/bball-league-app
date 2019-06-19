import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";


import {login} from '../actions/authActions'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class LogIn extends React.Component {

  state = {
    errorMessage: '',
    name: '',
    password: ''
  }

  isFormValid = () => {
    const {name, password} = this.state
    if(name.length === 0 || password.length === 0) {
      this.setState({errorMessage:'Name and Password fields are required'})
      return false
    }
    return true
  }
  onSubmit = (e) => {
    e.preventDefault()
    if(!this.isFormValid()) return
    const {name, password} = this.state
    
    this.props.dispatch(login({name, password}))
    .then( () => {
      this.props.history.push("/")
    })
    .catch( error => {
     const message = error.response.data.error.message
      this.setState({errorMessage: message})
    })
  }

  onChange = (e) => {
    const {name, value}= e.target
    return this.setState({
      [name] : value
    })
  }

  render() {
    const {classes} = this.props,
          {errorMessage} = this.state
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form className={classes.form}>
          {errorMessage  && 
            <Typography component="p" color="error">
                  {errorMessage}
            </Typography>
          }
          <Typography component="p" variant="caption">
            *required
          </Typography>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name" >Name</InputLabel>
              <Input name="name" type="text" id="name" value={this.state.name} onChange={this.onChange} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password" >Password</InputLabel>
              <Input name="password" type="password" id="password" value={this.state.password} onChange={this.onChange} />
            </FormControl>
            <Button
              type="submit"
              onClick={this.onSubmit}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log in
            </Button>
          </form>
        </Paper>
      </main>
    )
  }
}


export default withRouter(connect()(withStyles(styles)(LogIn)))