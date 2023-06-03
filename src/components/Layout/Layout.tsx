import React from "react";

import { ReactComponent as RubyIcon } from "../../assets/icons/ruby-svgrepo-com.svg";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <RubyIcon width={40} style={{ marginRight: 15 }} />
          <Typography variant="h6" color="inherit" noWrap>
            RUBY PRO LABS
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </>
  );
}
