import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ToggleColorMode from "./App";

import store from "./store/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToggleColorMode />
    </Provider>
  </React.StrictMode>
);
