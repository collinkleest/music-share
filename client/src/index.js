import React from "react";
import ReactDOM from "react-dom";
import App from './Components/App';
import {Provider} from "react-redux";
import Store from "./redux/store";
import "./index.css";
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
    <CookiesProvider>
      <Provider store={Store}>
          <App />
      </Provider>
    </CookiesProvider>,
  document.getElementById("root")
);