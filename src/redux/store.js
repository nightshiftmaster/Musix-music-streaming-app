import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";
import fakeApiReducer from "./features/fakeApiSlice";
import { shazamCoreApi } from "./services/shazamCore";

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
    fakeApi: fakeApiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shazamCoreApi.middleware),
});
