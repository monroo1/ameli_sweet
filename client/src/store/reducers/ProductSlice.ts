import { createSlice } from "@reduxjs/toolkit";
import { productsService } from "../../services/ProductsService";
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
  category: "",
  fillings: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductChange: (state, action) => {
      state[action.payload.key as keyof IProduct] = action.payload
        .value as never;
    },
    setProductImages: (state, action) => {
      state.images = [...state.images, ...action.payload];
    },
    setProductImagesDelete: (state, action) => {
      state.images = state.images.filter((el) => el.href !== action.payload);
    },
    setProductImagesDnd: (state, action) => {
      state.images = action.payload;
    },
    setProductCategory: (state, action) => {
      state.category = action.payload;
    },
    setProductFillings: (state, action) => {
      state.fillings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productsService.endpoints.createProduct.matchFulfilled,
      (state) => (state = initialState)
    );
    builder.addMatcher(
      productsService.endpoints.patchProduct.matchFulfilled,
      (state) => (state = initialState)
    );
  },
});

export const {
  setProductChange,
  setProductImages,
  setProductImagesDelete,
  setProductImagesDnd,
  setProductCategory,
  setProductFillings,
} = productSlice.actions;

export default productSlice.reducer;
