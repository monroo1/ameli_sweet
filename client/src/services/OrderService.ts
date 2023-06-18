import { apiSlice } from "../store/indexService";
import { IOrder, OrderPatchStatusRequest } from "../utils/interface/order";
import { ResponseCreatePayment } from "../utils/interface/payment";

export const orderService = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Order", "Basket"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getOrdersUser: builder.query<IOrder[], void>({
        query: () => ({
          url: "/api/order/",
        }),
        providesTags: ["Order"],
      }),
      getOrderUser: builder.query<IOrder, string>({
        query: (id) => ({
          url: `/api/order/${id}`,
        }),
        providesTags: ["Order"],
      }),
      getOrders: builder.query<IOrder[], void>({
        query: () => ({
          url: `/api/order/admin/all`,
        }),
        providesTags: ["Order"],
      }),
      createOrder: builder.mutation<IOrder, void>({
        query: () => ({
          url: "/api/order/create",
          method: "POST",
        }),
        invalidatesTags: ["Order", "Basket"],
      }),
      patchOrder: builder.mutation<IOrder, IOrder>({
        query: (orderBody) => ({
          url: `/api/order/patch`,
          method: "PATCH",
          body: orderBody,
        }),
        invalidatesTags: ["Order"],
      }),
      patchOrderStatus: builder.mutation<IOrder, OrderPatchStatusRequest>({
        query: ({ id, newStatus }) => ({
          url: `/api/order/changeStatus/${id}`,
          method: "PATCH",
          body: { newStatus: newStatus },
        }),
        invalidatesTags: ["Order"],
      }),
      deleteOrder: builder.mutation<any, string>({
        query: (id) => ({
          url: `/api/order/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Order"],
      }),
      paymentOrder: builder.mutation<ResponseCreatePayment, any>({
        query: (cred: { id: string }) => ({
          url: `/api/order/payment/${cred.id}`,
          method: "POST",
        }),
        invalidatesTags: ["Order"],
      }),
      checkPaymentOrder: builder.mutation<ResponseCreatePayment, string>({
        query: (id) => ({
          url: `/api/order/payment/${id}`,
          method: "GET",
        }),
        invalidatesTags: ["Order"],
      }),
    }),
  });

export const {
  useGetOrdersUserQuery,
  useGetOrderUserQuery,
  useGetOrdersQuery,
  useCreateOrderMutation,
  usePatchOrderMutation,
  usePatchOrderStatusMutation,
  useDeleteOrderMutation,
  usePaymentOrderMutation,
  useCheckPaymentOrderMutation,
} = orderService;
