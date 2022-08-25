import React from "react";
import Home from "./pages/Home";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export const App = () => {
  return (
    <Router>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Home />
      </LocalizationProvider>
    </Router>
  );
};
