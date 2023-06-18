import { createSlice } from "@reduxjs/toolkit";
import { IOrder } from "../../utils/interface/order";
import { orderService } from "../../services/OrderService";

const initialState: IOrder = {
  _id: "",
  items: [],
  user: "",
  cost: 0,
  status: 0,
  payments: false,
  delivery: false,
  communication: 0,
  phoneNumber: "+7",
  date: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state = action.payload;
    },
    removeOrder: (state, action) => {},
    setDelivery: (state, action) => {
      state.delivery = action.payload;
    },
    setCommunication: (state, action) => {
      state.communication = action.payload;
    },
    setPayment: (state, action) => {
      state.payments = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      orderService.endpoints.getOrderUser.matchFulfilled,
      (state, action) => (state = action.payload)
    );
    builder.addMatcher(
      orderService.endpoints.patchOrder.matchFulfilled,
      (state, action) => (state = initialState)
    );
    builder.addMatcher(
      orderService.endpoints.patchOrderStatus.matchFulfilled,
      (state, action) => (state = initialState)
    );
    builder.addMatcher(
      orderService.endpoints.deleteOrder.matchFulfilled,
      (state, action) => (state = initialState)
    );
  },
});

export const {
  setDelivery,
  setCommunication,
  setPayment,
  setPhoneNumber,
  setDate,
  setOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
