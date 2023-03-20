import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { apiSlice } from "./indexService";
import authReducer from "./reducers/AuthSlice";
import productReducer from "./reducers/ProductSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authReducer"],
};

const rootReducer = combineReducers({
  authReducer,
  productReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const presistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: presistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
