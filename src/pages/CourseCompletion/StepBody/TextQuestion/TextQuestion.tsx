import React, { useEffect } from "react";

import { Button, FormControl, TextField, FormHelperText } from "@mui/material";
import { useCreateAnswerMutation } from "../../../../store/userCourses/userCourses.api";
import { IStepBody } from "../StepBody";

export default function TextQuestion(props: IStepBody) {
  const [createAnswer, { data: createAnswerData }] = useCreateAnswerMutation();
  const [value, setValue] = React.useState("");
  const [isCheckMode, setIsCheckMode] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Выберите ответ");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setError(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isCheckMode) {
      return;
    }
    if (!value) {
      return;
    }
    const resp: any = await createAnswer({
      question_id: props.question.id,
      answer: value,
      user_course_id: props.courseId,
    });

    if (resp?.data?.result_code === "ok") {
      setIsCheckMode(true);
      if (resp?.data?.payload?.correct) {
        setError(false);
        setSuccess(true);
        setHelperText("Ответ верный");
      } else {
        setError(true);
        setHelperText("Ответ не верный");
      }
    }
  };

  function nextStep() {
    setValue("");
    setError(false);
    setHelperText("Выберите ответ");
    setIsCheckMode(false);
    setSuccess(false);

    props.setCurrentStep(props.currentStep + 1);
  }

  useEffect(() => {
    if (props.question.answers.length !== 0) {
      setIsCheckMode(true);
      const answer = props.question.answers[0];

      answer && setValue(answer.content);
      if (answer.correct) {
        setError(false);
        setSuccess(true);
        setHelperText("Ответ верный");
      } else {
        setError(true);
        setHelperText("Ответ не верный");
      }
    }
  }, [props.question.id]);

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        sx={{ m: 3, width: "100%" }}
        error={error}
        variant="standard"
      >
        <TextField
          autoFocus
          error={error}
          color={success ? "success" : "info"}
          focused
          value={value}
          onChange={handleInputChange}
          type=""
          multiline={props.question.type === "Question::Programming"}
          minRows={props.question.type === "Question::Programming" ? 5 : 0}
          InputProps={{
            readOnly: isCheckMode,
          }}
        />

        {helperText.length > 0 && (
          <FormHelperText
            sx={{
              color: success ? "success.main" : "",
              fontWeight: 600,
              fontSize: 20,
            }}
          >
            {helperText}
          </FormHelperText>
        )}
        {props.question.answers.length === 0 && !isCheckMode && (
          <Button sx={{ mt: 2 }} type="submit" variant="outlined">
            Подтвердить
          </Button>
        )}

        {(props.question.answers.length !== 0 || isCheckMode) && (
          <Button
            sx={{ mt: 1, mr: 1 }}
            type="button"
            variant="outlined"
            onClick={nextStep}
          >
            Дальше
          </Button>
        )}
      </FormControl>
    </form>
  );
}
