import * as React from "react";
import * as ReactDOM from "react-dom";
import {App} from './Components/App';
import {Provider} from "react-redux";
import Store from "./redux/store";
import "./index.css";
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <Provider store={Store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>,
  document.getElementById("root")
);