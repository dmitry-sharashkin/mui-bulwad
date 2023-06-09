import React from "react";

import styles from "./styles.module.css";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useGetCoursesQuery } from "../../store/courses/courses.api";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import {
  useGetUserCoursesQuery,
  useSubscribeCourseMutation,
} from "../../store/userCourses/userCourses.api";

export default function Main() {
  const { data, refetch } = useGetCoursesQuery();
  const { refetch: refetchUserCourses } = useGetUserCoursesQuery();
  const [subscribeCourse] = useSubscribeCourseMutation();

  async function onSubscribeClick(id: number) {
    await subscribeCourse({ course_id: id });
    refetch();
    refetchUserCourses();
  }

  return (
    <>
      <Grid container spacing={4}>
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
                <div className={styles.cardText}>
                  <ReactMarkdown>{item.description || ""}</ReactMarkdown>
                </div>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between" }}>
                <Typography>
                  <span>
                    {dayjs(item.created_at).locale("ru").format("DD.MM.YYYY")}
                  </span>
                </Typography>
                <Box>
                  <NavLink to={`/course/${item.id}`}>
                    <Button size="small">Открыть</Button>
                  </NavLink>
                  {!item.is_subscribed && (
                    <Button
                      size="small"
                      onClick={() => onSubscribeClick(item.id)}
                    >
                      Подписаться
                    </Button>
                  )}
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
