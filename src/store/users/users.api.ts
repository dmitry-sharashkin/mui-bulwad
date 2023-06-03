import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithToken from "../base-query";

interface createResponse {}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQueryWithToken,
  endpoints: (builder) => ({
    createUser: builder.mutation<
      createResponse,
      {
        full_name: string;
        email: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: `/v1/users`,
        method: "POST",
        body: {
          user: body,
        },
      }),
    }),
  }),
});

export const { useCreateUserMutation } = usersApi;
