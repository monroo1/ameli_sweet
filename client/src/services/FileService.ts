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
    removeImage: builder.mutation({
      query: (href) => ({
        url: `/api/files/delete/${href}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useDownloadMutation, useRemoveImageMutation } = fileService;
