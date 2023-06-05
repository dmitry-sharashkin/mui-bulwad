import React from "react";

import dayjs from "dayjs";
import { useGetUserCoursesQuery } from "../../store/userCourses/userCourses.api";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

export default function MyCourses() {
  const { data } = useGetUserCoursesQuery();

  return (
    <>
      <Grid container spacing={4}>
        {data?.payload.length === 0 && <Typography>Нет курсов</Typography>}
        {data?.payload.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={6}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  fontWeight={800}
                >
                  {item.title}
                </Typography>
                <Divider />
                <Box
                  mt={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    justifyContent: "space-between",
                  }}
                >
                  {item.completed ? (
                    <Chip label="Пройден" color="success" variant="outlined" />
                  ) : (
                    <Chip
                      label="Не пройден"
                      color="primary"
                      variant="outlined"
                    />
                  )}
                  <Typography>Баллов: {item.grade}</Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between" }}>
                <Typography>
                  <span>
                    Создан:{" "}
                    {dayjs(item.created_at).locale("ru").format("DD.MM.YYYY")}
                  </span>
                </Typography>
                <Box>
                  <NavLink to={`/course/${item.id}`}>
                    <Button size="small">Открыть</Button>
                  </NavLink>
                  {/* <Button
                    size="small"
                    onClick={() => subscribeCourse({ course_id: item.id })}
                  >
                    Подписаться
                  </Button> */}
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
