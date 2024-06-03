import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import apiSlice from "./apislice";

export const store = configureStore({
  reducer: {
    [movieReducer.name]: movieReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
