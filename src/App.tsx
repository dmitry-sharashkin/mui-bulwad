import React, { useEffect } from "react";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "./store/hooks";
import { selectIsAuthActive } from "./store/auth/auth.slice";
import CssBaseline from "@mui/material/CssBaseline";
import Router from "./components/Router/Router";

function App() {
  return (
    <>
      <CssBaseline />
      <Router />
    </>
  );
}

export default App;
