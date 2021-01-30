import React from "react";
import App from "./App";
import ReactDOM from "react-dom";
import Input from "./Input";
import Chapter from "./Chapter";
import { Route, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./../redux/store";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Route path="/input" component={Input} />
      <Route path="/main" component={App} />
      <Route path="/chapter" component={Chapter} />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
