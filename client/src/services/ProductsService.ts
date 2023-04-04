import { apiSlice } from "../store/indexService";

export const productsService = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Products"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getProducts: builder.query<any, void>({
        query: () => ({
          url: "/api/products/",
        }),
        providesTags: ["Products"],
      }),
      getProduct: builder.query({
        query: (id) => ({
          url: `/api/products/${id}`,
        }),
        providesTags: ["Products"],
      }),
      createProduct: builder.mutation({
        query: (credentials) => ({
          url: "/api/products/create",
          method: "POST",
          body: { ...credentials },
        }),
        invalidatesTags: ["Products"],
      }),
      deleteProduct: builder.mutation({
        query: (id) => ({
          url: `/api/products/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Products"],
      }),
      patchProduct: builder.mutation({
        query: ({ id, credentials }) => ({
          url: `/api/products/patch/${id}`,
          method: "PATCH",
          body: { ...credentials },
        }),
        invalidatesTags: ["Products"],
      }),
    }),
  });

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  usePatchProductMutation,
} = productsService;
