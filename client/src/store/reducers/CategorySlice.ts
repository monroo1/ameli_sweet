import { createSlice } from "@reduxjs/toolkit";
import { categoryService } from "../../services/CategoryService";

export interface Category {
  newName: string;
  name: string;
}

const initialState: Category = {
  name: "",
  newName: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryName: (state, action) => {
      state.name = action.payload;
    },
    setCategoryNewName: (state, action) => {
      state.newName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      categoryService.endpoints.createCategory.matchFulfilled,
      (state) => {
        state.name = "";
      }
    );
    builder.addMatcher(
      categoryService.endpoints.patchCategory.matchFulfilled,
      (state) => {
        state.name = "";
        state.newName = "";
      }
    );
  },
});

export const { setCategoryName, setCategoryNewName } = categorySlice.actions;

export default categorySlice.reducer;
