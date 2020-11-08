import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import {Link} from "react-router-dom"; 
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        Music Share
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export const SignUp = (props) => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [passWord, setPassword] = useState('');
  const [emailAddress, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isEmptyFields, setIsEmptyFields] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [userNameExists, setUserNameExists] = useState(false);

  const DEV_URI = (process.env.NODE_ENV == "development") ? 'http://localhost:5000' : ''

  const checkBlankFields = () => {
    if ((firstName.trim().length > 0) && (lastName.trim().length > 0) && 
    (passWord.trim().length > 0) && (emailAddress.trim().length > 0) && (userName.trim().length > 0)){
      setIsEmptyFields(false);
      return true;
    } else {
      setIsEmptyFields(true);
      return false;
    }
  }

  const checkUserName = (userName) => {
    axios.get(`${DEV_URI}/api/v1/users/${userName}`)
    .then((res) => {
        if (res.data == true){
          setUserNameExists(true);
          return true;
        } else {
          setUserNameExists (false);
          return false;
        }
    }).catch((err) => {
      console.log(err);
    })
  } 

  const validateEmail = (email) => {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      setIsValidEmail(true);
      return true;
    } else {
      setIsValidEmail(false);
      return false;
    }
  }

   const signUp = (e) => {
      if (checkBlankFields() && validateEmail(emailAddress) && (checkUserName(userName) == false)){
        axios.post(`${DEV_URI}/api/v1/users/`, {
          firstName: firstName,
          lastName: lastName, 
          passWord: passWord,
          emailAddress: emailAddress,
          userName: userName
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                value={userName}
                onChange={e => setUserName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={emailAddress}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={passWord}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              {isEmptyFields && <MuiAlert severity="error">All fields must be filled out</MuiAlert>}
              {!(isValidEmail) && <MuiAlert severity="error">Email is not valid format</MuiAlert>}
              {userNameExists && <MuiAlert severity="error">User name is already taken</MuiAlert>}
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}