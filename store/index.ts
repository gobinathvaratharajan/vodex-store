import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import dataReducer from "./slices/dataSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartItems", "favoriteProductIds", "listingFilters"], // persist specific slices
};

const persistedReducer = persistReducer(persistConfig, dataReducer);

export const store = configureStore({
  reducer: {
    data: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
