import * as React from "react";
import * as ReactDOM from "react-dom";
import {App} from './Components/App';
import {Provider} from "react-redux";
import Store from "./redux/store";
import "./index.css";

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);