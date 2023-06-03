import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { loggedOut } from "./auth/auth.slice";
import { getAccessToken } from "../cookies/cookies";

const baseQueryWithToken = fetchBaseQuery({
  baseUrl: "https://rubyprolabs.pw/",
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithTokenWrapper: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQueryWithToken(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    api.dispatch(loggedOut());
  }
  return result;
};

export default baseQueryWithTokenWrapper;
