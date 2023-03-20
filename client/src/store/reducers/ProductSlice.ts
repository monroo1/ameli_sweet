import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../models/Product";

const initialState: IProduct = {
  _id: "",
  name: "",
  price: 0,
  promoPrice: 0,
  description: "",
  isStock: false,
  count: 0,
  images: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    changeValue: (state, action) => {
      state[action.payload.key as keyof IProduct] = action.payload
        .value as never;
    },
    addImages: (state, action) => {
      state.images = [...state.images, ...action.payload];
    },
  },
});

export const { changeValue, addImages } = productSlice.actions;

export default productSlice.reducer;
