import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithToken from "../base-query";

interface IUserCourseItem {
  id: number;
  completed: boolean;
  grade: number;
  created_at: string;
  updated_at: string;
  title: string;
  user: {
    id: number;
    full_name: string;
    avatar: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
  };
}
interface IUserCoursesResponse {
  result_code: string;
  payload: IUserCourseItem[];
}
interface IUserCourseResponse {
  result_code: string;
  payload: IUserCourseItem[];
}

interface IAnswerResponse {
  result_code: string;
  payload: {
    id: number;
    content: string;
    correct: boolean;
    created_at: string;
    updated_at: string;
    question: {
      id: number;
      title: string;
      content: string;
      type: string;
      created_at: string;
      updated_at: string;
    };
  };
}

interface ICreateAnswerResponse {
  result_code: string;
  payload: {
    id: number;
    content: string;
    correct: boolean;
    created_at: string;
    updated_at: string;
    question: {
      id: number;
      title: string;
      content: string;
      type: string;
      created_at: string;
      updated_at: string;
    };
  };
}

export interface IQuestionItem {
  id: number;
  title: string;
  content: string;
  type:
    | "Question::Radio"
    | "Question::Programming"
    | "Question::Regex"
    | "Question::Text";
  created_at: string;
  updated_at: string;
  choices?: {
    id: number;
    content: string;
    number: string;
  }[];
  answers: {
    id: number;
    content: string;
    correct: boolean;
    created_at: string;
    updated_at: string;
  }[];
}
interface ICourseQuestionsResponse {
  result_code: string;
  payload: IQuestionItem[];
}

export const userCoursesApi = createApi({
  reducerPath: "userCoursesApi",
  baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    getUserCourses: builder.query<IUserCoursesResponse, void>({
      query: () => `/v1/user_courses`,
    }),
    getUserCourse: builder.query<IUserCourseResponse, { course_id: string }>({
      query: () => `/v1/user_courses`,
    }),
    subscribeCourse: builder.mutation<IAnswerResponse, { course_id: number }>({
      query: (body) => ({
        url: `/v1/user_courses`,
        method: "POST",
        body,
      }),
    }),
    getCourseQuestions: builder.query<
      ICourseQuestionsResponse,
      { course_id: string }
    >({
      query: (params) => `/v1/user_courses/${params.course_id}/questions`,
    }),
    createAnswer: builder.mutation<
      ICreateAnswerResponse,
      { user_course_id: number; question_id: number; answer: string }
    >({
      query: ({ question_id, user_course_id, answer }) => ({
        url: `/v1/user_courses/${user_course_id}/questions/${question_id}/answer`,
        method: "POST",
        body: {
          content: answer,
        },
      }),
    }),
    completeCourse: builder.mutation<{}, { user_course_id: number }>({
      query: ({ user_course_id }) => ({
        url: `/v1/user_courses/${user_course_id}/complete`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSubscribeCourseMutation,
  useGetUserCoursesQuery,
  useGetCourseQuestionsQuery,
  useGetUserCourseQuery,
  useCreateAnswerMutation,
  useCompleteCourseMutation,
} = userCoursesApi;
