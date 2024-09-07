import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";
import apiReducer from "./features/apiSlice";
import { shazamCoreApi } from "./services/apiCore";

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
    api: apiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shazamCoreApi.middleware),
});
