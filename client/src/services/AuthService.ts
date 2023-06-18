import {
  UserLoginRequest,
  UserRegisterRequest,
  UserAuthResponse,
} from "../utils/interface/user";
import { apiSlice } from "../store/indexService";

export const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserAuthResponse, UserLoginRequest>({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    registration: builder.mutation<UserAuthResponse, UserRegisterRequest>({
      query: (credentials) => ({
        url: "/api/auth/registration",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
    }),
    refresh: builder.query<UserAuthResponse, any>({
      query: () => ({
        url: "/api/auth/refresh",
      }),
    }),
    getUsers: builder.mutation({
      query: () => ({
        url: "/api/auth/users",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useLogoutMutation,
  useRefreshQuery,
  useGetUsersMutation,
} = authService;
