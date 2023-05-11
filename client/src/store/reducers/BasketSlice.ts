import { createSlice } from "@reduxjs/toolkit";
import { basketService } from "../../services/BasketService";
import { IProduct } from "../../models/Product";
import { Filling } from "./FillingSlice";

export interface IBasketItem {
  _id: string;
  product: string | IProduct;
  filling: string;
  count: number;
}

export interface PatchBasketItem {
  _id: string;
  count: number;
}

const initialState: IBasketItem = {
  _id: "",
  product: "",
  filling: "",
  count: 0,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setCountBasketItem: (state, action) => {
      state.count = action.payload;
    },
    setFillingBasketItem: (state, action) => {
      state.filling = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      basketService.endpoints.addItemBasket.matchFulfilled,
      (state) => {
        state.count = 0;
        state.filling = "";
      }
    );
    builder.addMatcher(
      basketService.endpoints.patchItemBasket.matchFulfilled,
      (state) => {
        state.count = 0;
        state.filling = "";
      }
    );
  },
});

export const { setCountBasketItem, setFillingBasketItem } = basketSlice.actions;

export default basketSlice.reducer;
