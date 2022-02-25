import { configureStore,combineReducers } from '@reduxjs/toolkit'
import counterSlice from './slices/counter'
import userSlice from './slices/user'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

//persist conf
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

export const rootReducer = combineReducers({counter :counterSlice,users: userSlice})

//persist conf
const persistedReducer = persistReducer(persistConfig, 
  rootReducer
)

export const store = configureStore({
  reducer: persistedReducer,

// persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  
})

export let persistor = persistStore(store)
