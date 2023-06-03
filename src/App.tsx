import React, { useEffect } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "./store/hooks";
import { selectIsAuthActive } from "./store/auth/auth.slice";

function App() {
  const isAuthActive = useAppSelector(selectIsAuthActive);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isAuthActive && pathname !== "/signIn" && pathname !== "/signUp") {
      navigate("/signIn");
    }
  }, [isAuthActive]);

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route element={<>home</>} path="/" />
        <Route element={<SignIn />} path="/signIn" />
        <Route element={<SignUp />} path="/signUp" />
      </Routes>
    </>
  );
}

export default App;
