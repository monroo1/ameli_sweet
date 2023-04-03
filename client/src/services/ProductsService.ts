import { apiSlice } from "../store/indexService";

export const productsService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<any, void>({
      query: () => ({
        url: "/api/products/",
      }),
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `/api/products/${id}`,
      }),
    }),
    createProduct: builder.mutation({
      query: (credentials) => ({
        url: "/api/products/create",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/products/refresh/${id}`,
        method: "DELETE",
      }),
    }),
    patchProduct: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/api/products/users/${id}`,
        method: "PATCH",
        body: { ...credentials },
      }),
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
