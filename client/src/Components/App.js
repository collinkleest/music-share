import React from "react";
import {HashRouter, Route} from "react-router-dom";
import {Home} from './Home';
import {SignIn} from './Login';
import {SignUp} from './Signup';
import {Password} from "./Password";

export class App extends React.Component{
  render() {
    return (
      <HashRouter>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/forgot-password">
          <Password />
        </Route>
      </HashRouter>
    )
  }
}