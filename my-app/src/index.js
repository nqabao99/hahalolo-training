import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/reset.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
