import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithToken from "../base-query";

interface IUserResponse {
  result_code: string;
  payload: {
    id: number;
    full_name: string;
    avatar: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
  };
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    getUserInfo: builder.query<IUserResponse, void>({
      query: () => `/v1/user`,
    }),
  }),
});

export const { useGetUserInfoQuery } = userApi;
