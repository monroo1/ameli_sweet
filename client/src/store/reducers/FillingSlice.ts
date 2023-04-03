import { createSlice } from "@reduxjs/toolkit";
import { fillingService } from "../../services/FillingService";
import { IFile } from "../../models/Product";

export interface Filling {
  _id: string;
  name: string;
  description: string;
  images: IFile[];
  price: number;
}

const initialState: Filling = {
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
  },
  extraReducers: (builder) => {
    // builder.addMatcher(
    //     fillingService.endpoints..matchFulfilled,
    //     (state) => {
    //       state = initialState;
    //     }
    //   );
    builder.addMatcher(
      fillingService.endpoints.createFilling.matchFulfilled,
      (state) => {
        state = initialState;
      }
    );
    builder.addMatcher(
      fillingService.endpoints.patchFilling.matchFulfilled,
      (state) => {
        state = initialState;
      }
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
} = fillingSlice.actions;

export default fillingSlice.reducer;
