import React from "react";
import {HashRouter, Route} from "react-router-dom";
import {Home} from './Home';
import {Login} from './Login';
import {SignUp} from './Signup';
import {Password} from "./Password";

export class App extends React.Component{
  render() {
    return (
      <HashRouter>
        <Route exact path="/">
          <Login />
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