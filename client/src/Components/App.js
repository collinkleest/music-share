import React from "react";
import {HashRouter, Route} from "react-router-dom";
import {Home} from './Home';
import {Login} from './Login';
import {SignUp} from './Signup';
import {Password} from "./Password";
import {MusicLogin} from "./Music Login";
import { withCookies } from 'react-cookie';
import { SpotifyApiContext } from 'react-spotify-api';
import {connect} from "react-redux";
import compose from "recompose/compose";

const mapStateToProps = (state, ownProps) => {
    return {
        loggedIn: state.loggedIn,
        cookies: ownProps.cookies,
        spotifyToken: state.spotifyToken
    };
};

class App extends React.Component {
  render(){
      return (
        <SpotifyApiContext.Provider value={this.props.spotifyToken}>
          <HashRouter>
            <Route path="/music-login">
              <MusicLogin cookies={this.props.cookies}/>
            </Route>
            <Route exact path="/">
              <Login cookies={this.props.cookies}/>
            </Route>
            <Route path="/signup">
              <SignUp cookies={this.props.cookies}/>
            </Route>
            <Route path="/home">
              <Home cookies={this.props.cookies}/>
            </Route>
            <Route path="/forgot-password">
              <Password cookies={this.props.cookies}/>
            </Route>
        </HashRouter>
        </SpotifyApiContext.Provider>
    )
  }
}

export default withCookies(connect(mapStateToProps)(App));