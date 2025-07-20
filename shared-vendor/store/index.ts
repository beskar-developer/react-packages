import storage from "redux-persist/lib/storage";

import { default as themeModeReducer, name as themeName } from "@shared-vendor/store/Theme";

const PERSIST_CONFIG = {
  key: "root",
  storage,
  whitelist: [themeName],
};

const rootReducer = combineReducers({
  theme: themeModeReducer,
});

const persistedReducer = persistReducer(PERSIST_CONFIG, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
