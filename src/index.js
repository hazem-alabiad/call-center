import "bootstrap/dist/css/bootstrap.min.css";
import PlaneLoader from "components/PlaneLoader";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// ###########    Helper Component    ###########

// ############    Main Component    ############
ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<PlaneLoader />}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
