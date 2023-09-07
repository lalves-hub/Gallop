import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import reportWebVitals from "./reportWebVitals";
import ShowJobs from "./pages/ShowJobs";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/showjobs" element={<ShowJobs />} />
      <Route exact path="/signup" element={<SignUp />} />
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
