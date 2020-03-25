import React, { StrictMode } from "react";
import { render } from "react-dom";
import App from "./App";
import "./global.css";

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
