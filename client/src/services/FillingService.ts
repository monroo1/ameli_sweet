import { apiSlice } from "../store/indexService";
import { Filling } from "../store/reducers/FillingSlice";

export const fillingService = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Filling"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getFillings: builder.query<Filling[], void>({
        query: () => ({
          url: "/api/filling/",
        }),
        providesTags: ["Filling"],
      }),
      getFilling: builder.query<any, void>({
        query: (id) => ({
          url: `/api/filling/${id}`,
        }),
      }),
      createFilling: builder.mutation({
        query: (credentials) => ({
          url: "/api/filling/create",
          method: "POST",
          body: { ...credentials },
        }),
        invalidatesTags: ["Filling"],
      }),
      deleteFilling: builder.mutation({
        query: (id) => ({
          url: `/api/filling/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Filling"],
      }),
      patchFilling: builder.mutation({
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
