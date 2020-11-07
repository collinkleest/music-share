import React from "react";
import {HashRouter, Route} from "react-router-dom";
import {Home} from './Home';
import {Login} from './Login';
import {Signup} from './Signup';

export class App extends React.Component{
  render() {
    return (
      <HashRouter>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </HashRouter>
    )
  }
}