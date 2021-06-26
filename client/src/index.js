import React from "react";
import ReactDom from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// this reducers is combined reducer
import reducers from "./reducers";

// store is created to store all states and middleware 'thunk' is applied
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
