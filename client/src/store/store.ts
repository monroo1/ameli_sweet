import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./indexService";
import authReducer from "./reducers/AuthSlice";

const rootReducer = combineReducers({ 
  authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
