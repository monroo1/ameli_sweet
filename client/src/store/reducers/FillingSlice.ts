import { createSlice } from "@reduxjs/toolkit";
import { fillingService } from "../../services/FillingService";
import { IFilling } from "../../utils/interface/filling";

const initialState: IFilling = {
  _id: "",
  name: "",
  description: "",
  images: [],
  price: 0,
};

export const fillingSlice = createSlice({
  name: "filling",
  initialState,
  reducers: {
    setFillingName: (state, action) => {
      state.name = action.payload;
    },
    setFillingDescription: (state, action) => {
      state.description = action.payload;
    },
    setFillingPrice: (state, action) => {
      state.price = action.payload;
    },
    setFillingImages: (state, action) => {
      state.images = [...state.images, ...action.payload];
    },
    setFillingImagesRemove: (state, action) => {
      state.images = state.images.filter((el) => el.href !== action.payload);
    },
    setFillingImagesDnd: (state, action) => {
      state.images = action.payload;
    },
    setFilling: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.images = action.payload.images;
      state.price = action.payload.price;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      fillingService.endpoints.createFilling.matchFulfilled,
      (state, action) => (state = initialState)
    );
    builder.addMatcher(
      fillingService.endpoints.patchFilling.matchFulfilled,
      (state, action) => (state = initialState)
    );
  },
});

export const {
  setFillingName,
  setFillingDescription,
  setFillingImages,
  setFillingPrice,
  setFillingImagesRemove,
  setFillingImagesDnd,
  setFilling,
} = fillingSlice.actions;

export default fillingSlice.reducer;
