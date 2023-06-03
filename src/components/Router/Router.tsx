import React, { useEffect } from "react";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectIsAuthActive } from "../../store/auth/auth.slice";
import Main from "../../pages/Main/Main";
import SignIn from "../../pages/SignIn/SignIn";
import SignUp from "../../pages/SignUp/SignUp";
import Layout from "../Layout/Layout";

export default function Router() {
  const isAuthActive = useAppSelector(selectIsAuthActive);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isAuthActive && pathname !== "/signIn" && pathname !== "/signUp") {
      navigate("/signIn");
    }
  }, [isAuthActive]);

  return (
    <Routes>
      <Route element={<Layout />} path="/">
        <Route element={<Main />} index path="/" />
      </Route>
      <Route element={<SignIn />} path="/signIn" />
      <Route element={<SignUp />} path="/signUp" />
    </Routes>
  );
}
