import { apiSlice } from "../store/indexService";

export const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    registration: builder.mutation({
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
    refresh: builder.query({
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
