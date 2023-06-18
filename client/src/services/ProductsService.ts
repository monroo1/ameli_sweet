import { apiSlice } from "../store/indexService";
import {
  IProduct,
  ProductCreateRequest,
  ProductPatchRequest,
} from "../utils/interface/product";

export const productsService = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Products"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getProducts: builder.query<IProduct[], void>({
        query: () => ({
          url: "/api/products/",
        }),
        providesTags: ["Products"],
      }),
      getProduct: builder.query<IProduct, string>({
        query: (id) => ({
          url: `/api/products/${id}`,
        }),
        providesTags: ["Products"],
      }),
      createProduct: builder.mutation<IProduct, ProductCreateRequest>({
        query: (credentials) => ({
          url: "/api/products/create",
          method: "POST",
          body: { ...credentials },
        }),
        invalidatesTags: ["Products"],
      }),
      deleteProduct: builder.mutation<any, string>({
        query: (id) => ({
          url: `/api/products/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Products"],
      }),
      patchProduct: builder.mutation<IProduct, ProductPatchRequest>({
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
