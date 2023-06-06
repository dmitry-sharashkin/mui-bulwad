import React, { useState } from "react";
import {
  useCompleteCourseMutation,
  useGetCourseQuestionsQuery,
  useGetUserCourseQuery,
  useGetUserCoursesQuery,
} from "../../store/userCourses/userCourses.api";
import { useNavigate, useParams } from "react-router-dom";
import {
  Stepper,
  Step,
  Typography,
  StepLabel,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import StepBody from "./StepBody/StepBody";

export default function CourseCompletion() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { refetch: refetchMyCourses } = useGetUserCoursesQuery();
  const [completeCourse] = useCompleteCourseMutation();
  const [currentStep, setCurrentStep] = useState(0);
  const { data: courseData } = useGetUserCourseQuery(
    { course_id: courseId as string },
    { skip: !courseId }
  );
  const { data, isLoading } = useGetCourseQuestionsQuery(
    { course_id: courseId as string },
    { skip: !courseId }
  );

  async function onCompleteCourseClick() {
    if (!courseId) {
      return;
    }
    await completeCourse({ user_course_id: +courseId });
    await refetchMyCourses();
    navigate("/myCourses");
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          padding: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <Typography component={"h1"} variant="h4" align="center" mb={4}>
        {courseData?.payload[0].title}
      </Typography>
      <Stepper
        activeStep={currentStep}
        alternativeLabel
        sx={{ marginBottom: 4 }}
      >
        {data?.payload.map((item, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (currentStep < index) {
            stepProps.completed = false;
          }
          return (
            <Step key={item.id} {...stepProps}>
              <StepLabel {...labelProps}>
                <div></div>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box>
        {data?.payload && data?.payload?.length !== currentStep && courseId ? (
          <StepBody
            question={data?.payload[currentStep]}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            courseId={+courseId}
          />
        ) : (
          <Box
            sx={{
              padding: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="contained" onClick={onCompleteCourseClick}>
              Завершить курс
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}
