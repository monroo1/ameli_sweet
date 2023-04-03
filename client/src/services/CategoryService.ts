import { apiSlice } from "../store/indexService";

export const categoryService = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Category"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCategories: builder.query<any, void>({
        query: () => ({
          url: "/api/category/",
        }),
        providesTags: ["Category"],
      }),
      createCategory: builder.mutation({
        query: (credentials) => ({
          url: "/api/category/create",
          method: "POST",
          body: { name: credentials },
        }),
        invalidatesTags: ["Category"],
      }),
      deleteCategory: builder.mutation({
        query: (name) => ({
          url: `/api/category/delete/${name}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Category"],
      }),
      patchCategory: builder.mutation({
        query: ({ name, newName }) => ({
          url: `/api/category/patch/${name}?newName=${newName}`,
          method: "PATCH",
        }),
        invalidatesTags: ["Category"],
      }),
    }),
    overrideExisting: false,
  });

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  usePatchCategoryMutation,
} = categoryService;
