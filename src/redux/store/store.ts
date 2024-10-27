import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from '../slices/authSlices';
import { PersistConfig } from 'redux-persist/es/types';

// Configuration for Redux Persist
const persistConfig: PersistConfig<any> = {
    key: 'root', // Key for the persisted state
    storage, // Storage engine
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: {
        auth: persistedReducer, // Use the persisted reducer here
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
});

// Create a persistor
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor }; // Use named exports for store and persistor