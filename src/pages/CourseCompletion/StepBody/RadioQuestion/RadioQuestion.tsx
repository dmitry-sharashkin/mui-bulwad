import React, { useEffect } from "react";

import { IStepBody } from "../StepBody";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  Button,
} from "@mui/material";
import { useCreateAnswerMutation } from "../../../../store/userCourses/userCourses.api";

export default function RadioQuestion(props: IStepBody) {
  const [createAnswer, { data: createAnswerData }] = useCreateAnswerMutation();

  const [value, setValue] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<null | number>(null);
  const [selectedNumber, setSelectedNumber] = React.useState<null | string>(
    null
  );
  const [isCheckMode, setIsCheckMode] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Выберите ответ");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isCheckMode) {
      return;
    }
    setValue((event.target as HTMLInputElement).value);
    setError(false);
  };

  useEffect(() => {
    if (props.question.answers.length !== 0 && props.question.choices) {
      setIsCheckMode(true);
      const answer = props.question.answers[0];
      const value = props.question.choices.find(
        (i) => i.number === answer.content
      );
      value && setValue(value.number);
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

  function nextStep() {
    setValue("");
    setError(false);
    setHelperText("Выберите ответ");
    setSelectedId(null);
    setIsCheckMode(false);

    props.setCurrentStep(props.currentStep + 1);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isCheckMode) {
      return;
    }
    if (!selectedNumber) {
      return;
    }
    const resp: any = await createAnswer({
      question_id: props.question.id,
      answer: selectedNumber,
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

  function getQuestionStyle(number: string) {
    if (!isCheckMode) {
      return "";
    }
    if (createAnswerData?.payload) {
      return createAnswerData.payload.content === number
        ? createAnswerData.payload.correct
          ? "success"
          : "error"
        : "";
    }
    return props.question.answers[0]?.content === number
      ? props.question.answers[0]?.correct
        ? "success"
        : "error"
      : "";
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ m: 3 }} error={error} variant="standard">
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          {props.question.choices &&
            props.question.choices.map((i) => (
              <FormControlLabel
                // disabled={isCheckMode}
                sx={{
                  color: `${getQuestionStyle(i.number)}.main`,
                }}
                key={i.id}
                value={i.number}
                control={
                  <Radio color={getQuestionStyle(i.number) || "primary"} />
                }
                label={i.content}
                onChange={() => {
                  setSelectedId(i.id);
                  setSelectedNumber(i.number);
                }}
              />
            ))}
        </RadioGroup>
        <FormHelperText
          sx={{
            color: success ? "success.main" : "",
            fontWeight: 600,
            fontSize: 20,
          }}
        >
          {helperText}
        </FormHelperText>
        {props.question.answers.length === 0 && !isCheckMode && (
          <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
            Выбрать
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
