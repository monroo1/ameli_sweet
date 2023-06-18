import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setUser, setLogout } from "./reducers/AuthSlice";

export const API_URL = "http://localhost:5000";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",

  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshResult = await baseQuery(
      "/api/auth/refresh",
      api,
      extraOptions
    );
    if (refreshResult.data) {
      api.dispatch(setUser(refreshResult.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(setLogout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
