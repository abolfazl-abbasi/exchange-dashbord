import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App.js";
import CoinsProvider from "./Providers/CoinsContextProvider.jsx";
import "./Services/httpServices.js";

ReactDOM.render(
  <CoinsProvider>
    <App />
  </CoinsProvider>,
  document.getElementById("root")
);
