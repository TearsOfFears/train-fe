// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./user/userSlice";
// import trainReducer from "./train/trainSlice";

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     train: trainReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { authReducer, logout } from './slices/authSlices'
import type { Action } from 'redux'
import {authApi} from "./services/auth.api";
import {trainApi} from "./services/train.api";

const persistConfig = {
  key: 'root',
  storage,
}

const apis = [
    trainApi,
    authApi,
]

const appReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  ...apis.reduce(
      (acc, api) => ({
        ...acc,
        [api.reducerPath]: api.reducer,
      }),
      {}
  ),
})

const rootReducer = (
    state: ReturnType<typeof appReducer> | undefined,
    action: Action
): ReturnType<typeof appReducer> => {
  if (action.type === logout.type) {
    state = undefined
    localStorage.removeItem('auth_token')
  }
  return appReducer(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
  // @ts-ignore
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }).concat(...apis.map((api) => api.middleware)),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof appReducer>
export type AppDispatch = typeof store.dispatch
