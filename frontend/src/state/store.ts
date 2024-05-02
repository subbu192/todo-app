import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist'

import userReducer from './slices/userSlice';
import viewstateReducer from './slices/viewstateSlice';

import storage from "redux-persist/lib/storage";
import { persistReducer } from 'redux-persist';

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    timeout: 100
};

const reducer = combineReducers({
    user: userReducer,
    viewstate: viewstateReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;