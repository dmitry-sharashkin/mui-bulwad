import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithToken from "../base-query";

interface getUserCoursesResponse {
  result_code: string;
  payload: {
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
  }[];
}

export const userCoursesApi = createApi({
  reducerPath: "userCoursesApi",
  baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    getUserCourses: builder.query<getUserCoursesResponse, void>({
      query: () => `/v1/user_courses`,
    }),
    subscribeCourse: builder.mutation<{}, { course_id: number }>({
      query: (body) => ({
        url: `/v1/user_courses`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSubscribeCourseMutation, useGetUserCoursesQuery } =
  userCoursesApi;
