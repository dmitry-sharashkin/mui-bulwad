import React from "react";

import { useParams } from "react-router-dom";
import {
  useGetCourseQuery,
  useGetCoursesQuery,
} from "../../store/courses/courses.api";
import { Box, Button, Chip, Typography } from "@mui/material";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import {
  useGetUserCoursesQuery,
  useSubscribeCourseMutation,
} from "../../store/userCourses/userCourses.api";

export default function Course() {
  const { id } = useParams();
  const { data, refetch } = useGetCourseQuery(
    { id: id as string },
    { skip: !id }
  );
  const { refetch: refetchCourses } = useGetCoursesQuery();
  const [subscribeCourse] = useSubscribeCourseMutation();
  const { refetch: refetchUserCourses } = useGetUserCoursesQuery();

  async function onSubscribeClick(id: number) {
    await subscribeCourse({ course_id: id });
    refetchCourses();
    refetch();
    refetchUserCourses();
  }
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h3">
          {data?.payload.title}
        </Typography>
        {!data?.payload.is_subscribed ? (
          <Button
            variant="outlined"
            onClick={() =>
              data?.payload.id && onSubscribeClick(data?.payload.id)
            }
          >
            Подписаться
          </Button>
        ) : (
          <Chip label="Подписка оформлена" color="primary" variant="outlined" />
        )}
      </Box>
      <Box>
        <ReactMarkdown>{data?.payload.description || ""}</ReactMarkdown>
      </Box>
    </Box>
  );
}
