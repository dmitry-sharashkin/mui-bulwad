import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithToken from "../base-query";

interface coursesResponse {
  result_code: string;
  payload: {
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
  }[];
}

export const coursesApi = createApi({
  reducerPath: "coursesApi",
  baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    getCourses: builder.query<coursesResponse, void>({
      query: () => `/v1/courses`,
    }),
  }),
});

export const { useGetCoursesQuery } = coursesApi;
