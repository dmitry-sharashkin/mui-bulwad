import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithToken from "../base-query";

interface authResponse {
  access_token: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    getAuthToken: builder.mutation<
      authResponse,
      {
        email: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: `/v1/auth/token`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetAuthTokenMutation } = authApi;
