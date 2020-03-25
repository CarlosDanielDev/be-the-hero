import React from "react";
import { Router } from "react-router-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import history from "./services/history";
import Routes from "./routes";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT
};

function App() {
  return (
    <Provider template={AlertTemplate} {...options}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
