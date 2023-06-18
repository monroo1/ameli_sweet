import { apiSlice } from "../store/indexService";
import { IBasketItem, PatchBasketItem } from "../utils/interface/basket";

export const basketService = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Basket"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getBasket: builder.query<IBasketItem[], void>({
        query: () => ({
          url: "/api/basket/",
        }),
        providesTags: ["Basket"],
      }),
      addItemBasket: builder.mutation<any, IBasketItem>({
        query: (credentials) => ({
          url: "/api/basket/addItem",
          method: "POST",
          body: credentials,
        }),
        invalidatesTags: ["Basket"],
      }),
      patchItemBasket: builder.mutation<any, PatchBasketItem>({
        query: (credentials) => ({
          url: `/api/basket/patchItem`,
          method: "PATCH",
          body: credentials,
        }),
        invalidatesTags: ["Basket"],
      }),
    }),
    overrideExisting: false,
  });

export const {
  useGetBasketQuery,
  useAddItemBasketMutation,
  usePatchItemBasketMutation,
} = basketService;
