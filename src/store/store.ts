// src/store/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import { rootPersistConfig } from "./persistConfig";

const rootReducer = combineReducers({
    user: userReducer
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;