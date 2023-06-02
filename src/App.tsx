import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import SignIn from "./pages/SignIn/SignIn";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route element={<SignIn />} path="/auth" />
      </Routes>
    </>
  );
}

export default App;
