import { combineReducers, configureStore } from "@reduxjs/toolkit";
import requestReducer from "./features/friendSlice"
import userReducer from "./features/userSlice"

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'friends_connection',
    version: 1,
    storage,
    blacklist: [] 
}

const rootReducer = combineReducers({
    request: requestReducer,
    users: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export let persistor = persistStore(store)
