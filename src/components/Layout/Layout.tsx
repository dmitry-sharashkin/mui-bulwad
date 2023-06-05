import React from "react";

import LogoutIcon from "@mui/icons-material/Logout";
import { ReactComponent as RubyIcon } from "../../assets/icons/ruby-svgrepo-com.svg";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
  Tooltip,
} from "@mui/material";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearAccessToken } from "../../cookies/cookies";
import { useGetUserInfoQuery, userApi } from "../../store/user/user.api";
import { useAppDispatch } from "../../store/hooks";

export default function Layout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data } = useGetUserInfoQuery();

  function logOut() {
    dispatch(userApi.util.resetApiState());
    clearAccessToken();
    navigate("/signIn");
  }
  return (
    <>
      <AppBar position="relative" sx={{ display: "flex" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <NavLink
              to={"/"}
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <RubyIcon width={40} style={{ marginRight: 15 }} />
              <Typography variant="h6" color="white" noWrap>
                RUBY PRO LABS
              </Typography>
            </NavLink>
            <NavLink
              to={"myCourses"}
              style={{ color: "white", textDecoration: "none", marginLeft: 30 }}
            >
              Мои курсы
            </NavLink>
          </Box>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Typography>{data?.payload.full_name}</Typography>
            <Tooltip title="Профиль">
              <NavLink to={"/profile"} style={{ textDecoration: "none" }}>
                {data?.payload && data?.payload?.avatar?.length > 0 ? (
                  <Avatar
                    alt={data?.payload.full_name}
                    src={data?.payload.avatar}
                  />
                ) : (
                  <Avatar>{data?.payload.full_name.slice(0, 1)}</Avatar>
                )}
              </NavLink>
            </Tooltip>
            <Tooltip title="Выход">
              <IconButton onClick={logOut} style={{ color: "white" }}>
                <LogoutIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Outlet />
        </Container>
      </main>
    </>
  );
}
