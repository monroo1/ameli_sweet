import { apiSlice } from "../store/indexService";

export const fileService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    download: builder.mutation({
      query: (data) => ({
        url: "/api/files/download",
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export const { useDownloadMutation } = fileService;
