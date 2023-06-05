import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithToken from "../base-query";

interface ICourseItem {
  id: number;
  is_subscribed: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}
interface ICoursesResponse {
  result_code: string;
  payload: ICourseItem[];
}

interface ICourseResponse {
  result_code: string;
  payload: ICourseItem;
}

export const coursesApi = createApi({
  reducerPath: "coursesApi",
  baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    getCourses: builder.query<ICoursesResponse, void>({
      query: () => `/v1/courses`,
    }),
    getCourse: builder.query<ICourseResponse, { id: string }>({
      query: ({ id }) => `/v1/courses/${id}`,
    }),
  }),
});

export const { useGetCoursesQuery, useGetCourseQuery } = coursesApi;
