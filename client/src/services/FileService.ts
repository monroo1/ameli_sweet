import { apiSlice } from "../store/indexService";
import { IFile } from "./../utils/interface/file";

export const fileService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    download: builder.mutation<IFile, any>({
      query: (data) => ({
        url: "/api/files/download",
        body: data,
        method: "POST",
      }),
    }),
    removeImage: builder.mutation<any, string>({
      query: (href) => ({
        url: `/api/files/delete/${href}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useDownloadMutation, useRemoveImageMutation } = fileService;
