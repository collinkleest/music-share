import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import {LoginAction} from '../../redux/actions/authActions';
import { connect } from 'react-redux';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
 
const mapStateToProps = (state, ownProps) => {
    return {
        loggedIn: state.loggedIn,
        cookies: ownProps.cookies,
    };
};

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  // react hooks
  const classes = useStyles();
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const dispatch = useDispatch();
  const { cookies } = props;

  const logIn = () => {
      let API_HOST = (process.env.NODE_ENV == "development") ? 'http://localhost:5000/api/v1/users' : '/api/v1/users' 
      axios.get(API_HOST, {
        params:{
          userName: userName,
          passWord: passWord
        }
      })
      .then(function (response) {
        if (response.data.status == 'SUCCESS'){
          history.push('/music-login');
          dispatch(LoginAction());
          cookies.set('loggedIn', true, { path: '/' });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={passWord}
            onChange={e => setPassWord(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(props) => logIn(props)}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default connect(mapStateToProps)(Login);