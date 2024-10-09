import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "@react-native-async-storage/async-storage";
import favoriteReducer from "./slices/favoriteSlice";
const favoritePersistConfig = {
  key: "favorites",
  storage,
};
const persistedFavoritesReducer = persistReducer(
  favoritePersistConfig,
  favoriteReducer
);
export const store = configureStore({
  reducer: {
    favorites: persistedFavoritesReducer,
  },
});

export const persistor = persistStore(store);
