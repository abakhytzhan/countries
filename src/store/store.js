import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";
import flagReducer from "../components/flagCards/flagCardsSlice";

const store = configureStore({
  reducer: {
    flag: flagReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

setupListeners(store.dispatch);
