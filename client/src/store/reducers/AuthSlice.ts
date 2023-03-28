import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/User";

interface State extends IUser {
  isLoading: boolean;
  error: string;
  isAuth: boolean;
}

const initialState: State = {
  isLoading: false,
  error: "",
  isAuth: false,
  email: "",
  role: "user",
  id: "",
  isActivated: false,
  name: "",
  phone: "",
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem("token", action.payload.accessToken);
      state.isLoading = false;
      state.error = "";
      state.isAuth = true;
      state.email = action.payload.user.email;
      state.id = action.payload.user.id;
      state.isActivated = action.payload.user.isActivated;
      state.name = action.payload.user.name;
      state.phone = action.payload.user.phone;
      state.role = action.payload.user.role;
    },
    setLogout: (state) => {
      localStorage.removeItem("token");
      state.isLoading = false;
      state.error = "";
      state.isAuth = false;
      state.email = "";
      state.id = "";
      state.isActivated = false;
      state.name = "";
      state.phone = "";
      state.role = "user";
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setLogout, setError } = authSlice.actions;

export default authSlice.reducer;
