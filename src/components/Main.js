import { Router } from "@reach/router";
import React from "react";
import ROUTE_NAMES from "../constants/routeNames";
import Agent from "./Agent";
import Call from "./Call";
import Home from "./Home";

// #################    Helpers   ################

// ############    Main Component    #############
const Main = () => {
  return (
    <Router>
      <Home path={ROUTE_NAMES.HOME} />
      <Agent path={ROUTE_NAMES.AGENT} />
      <Call path={ROUTE_NAMES.CALL} />
    </Router>
  );
};

export default Main;
