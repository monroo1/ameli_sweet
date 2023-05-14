import { createSlice } from "@reduxjs/toolkit";
import { basketService } from "../../services/BasketService";
import { IProduct } from "../../models/Product";

export interface IBasketItem {
  _id?: string;
  product: IProduct | string;
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
  count: 1,
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
        state.count = 1;
        state.filling = "";
      }
    );
    builder.addMatcher(
      basketService.endpoints.patchItemBasket.matchFulfilled,
      (state) => {
        state.count = 1;
        state.filling = "";
      }
    );
  },
});

export const { setCountBasketItem, setFillingBasketItem } = basketSlice.actions;

export default basketSlice.reducer;
