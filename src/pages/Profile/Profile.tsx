import React from "react";

import dayjs from "dayjs";
import { Avatar, Box, Typography, Paper } from "@mui/material";
import { useGetUserInfoQuery } from "../../store/user/user.api";

export default function Profile() {
  const { data } = useGetUserInfoQuery();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {data?.payload && data?.payload.avatar?.length > 0 ? (
        <Avatar
          alt={data?.payload.full_name}
          src={data?.payload.avatar}
          sx={{ width: 156, height: 156 }}
        />
      ) : (
        <Avatar
          alt={data?.payload.full_name}
          sx={{ width: 156, height: 156, fontSize: 60 }}
        >
          {data?.payload.full_name.slice(0, 1)}
        </Avatar>
      )}
      <Typography component="h1" variant="h3" sx={{ mb: 2 }}>
        {data?.payload.full_name}
      </Typography>
      <Paper sx={{ paddingLeft: 4, paddingY: 2, paddingRight: 10 }}>
        <Typography>email: {data?.payload.email}</Typography>
        <Typography>role: {data?.payload.role}</Typography>
        <Typography>id: {data?.payload.id}</Typography>
        <Typography>
          создан:{" "}
          {dayjs(data?.payload.created_at).locale("ru").format("DD.MM.YYYY")}
        </Typography>
        <Typography>
          обновлён:{" "}
          {dayjs(data?.payload.updated_at).locale("ru").format("DD.MM.YYYY")}
        </Typography>
      </Paper>
    </Box>
  );
}
