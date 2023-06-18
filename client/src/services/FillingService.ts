import { apiSlice } from "../store/indexService";
import {
  FillingCreateRequest,
  FillingPatchRequest,
  IFilling,
} from "../utils/interface/filling";

export const fillingService = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Filling"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getFillings: builder.query<IFilling[], void>({
        query: () => ({
          url: "/api/filling/",
        }),
        providesTags: ["Filling"],
      }),
      getFilling: builder.query<IFilling, string>({
        query: (id) => ({
          url: `/api/filling/${id}`,
        }),
      }),
      createFilling: builder.mutation<IFilling, FillingCreateRequest>({
        query: (credentials) => ({
          url: "/api/filling/create",
          method: "POST",
          body: { ...credentials },
        }),
        invalidatesTags: ["Filling"],
      }),
      deleteFilling: builder.mutation<string, any>({
        query: (id) => ({
          url: `/api/filling/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Filling"],
      }),
      patchFilling: builder.mutation<IFilling, FillingPatchRequest>({
        query: ({ id, body }) => ({
          url: `/api/filling/patch/${id}`,
          method: "PATCH",
          body: { ...body },
        }),
        invalidatesTags: ["Filling"],
      }),
    }),
  });

export const {
  useGetFillingsQuery,
  useGetFillingQuery,
  useCreateFillingMutation,
  useDeleteFillingMutation,
  usePatchFillingMutation,
} = fillingService;
