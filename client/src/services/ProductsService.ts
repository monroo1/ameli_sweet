import { apiSlice } from "../store/indexService";

export const productsService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAll: builder.query<any, void>({
      query: () => ({
        url: "/api/products/",
      }),
    }),
    getFromId: builder.query({
      query: (id) => ({
        url: `/api/products/${id}`,
      }),
    }),
    create: builder.mutation({
      query: (credentials) => ({
        url: "/api/products/create",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    delete: builder.mutation({
      query: (id) => ({
        url: `/api/products/refresh/${id}`,
        method: "DELETE",
      }),
    }),
    patch: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/api/products/users/${id}`,
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useGetAllQuery,
  useGetFromIdQuery,
  useCreateMutation,
  useDeleteMutation,
  usePatchMutation,
} = productsService;
