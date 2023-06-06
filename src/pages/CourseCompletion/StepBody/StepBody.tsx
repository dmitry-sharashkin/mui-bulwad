import React from "react";

import { IQuestionItem } from "../../../store/userCourses/userCourses.api";
import { Typography, Box } from "@mui/material";
import RadioQuestion from "./RadioQuestion/RadioQuestion";
import TextQuestion from "./TextQuestion/TextQuestion";

export interface IStepBody {
  question: IQuestionItem;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  courseId: number;
}

export default function StepBody(props: IStepBody) {
  return (
    <Box>
      <Typography align="center" component={"h2"} variant="h5">
        {props.question.title}
      </Typography>

      <Typography align="center" component={"p"} variant="subtitle1">
        {props.question.content}
      </Typography>

      {props.question.type === "Question::Radio" && (
        <RadioQuestion
          currentStep={props.currentStep}
          question={props.question}
          setCurrentStep={props.setCurrentStep}
          courseId={props.courseId}
        />
      )}
      {(props.question.type === "Question::Text" ||
        props.question.type === "Question::Regex" ||
        props.question.type === "Question::Programming") && (
        <TextQuestion
          courseId={props.courseId}
          currentStep={props.currentStep}
          question={props.question}
          setCurrentStep={props.setCurrentStep}
        />
      )}
    </Box>
  );
}
