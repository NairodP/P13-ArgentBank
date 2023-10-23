import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./AuthSlice";
import userProfileReducer from "./UserProfileSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  auth: authReducer,
  userProfile: userProfileReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "userProfile"], // Les slices a faire persister
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store);