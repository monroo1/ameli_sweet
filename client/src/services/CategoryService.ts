import { apiSlice } from "../store/indexService";
import {
  CategoryCreateRequest,
  CategoryPatchRequest,
  ICategory,
} from "../utils/interface/category";

export const categoryService = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Category"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCategories: builder.query<ICategory[], void>({
        query: () => ({
          url: "/api/category/",
        }),
        providesTags: ["Category"],
      }),
      createCategory: builder.mutation<ICategory, CategoryCreateRequest>({
        query: (cred) => ({
          url: "/api/category/create",
          method: "POST",
          body: { name: cred.name },
        }),
        invalidatesTags: ["Category"],
      }),
      deleteCategory: builder.mutation<void, CategoryCreateRequest>({
        query: ({ name }) => ({
          url: `/api/category/delete/${name}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Category"],
      }),
      patchCategory: builder.mutation<ICategory, CategoryPatchRequest>({
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
