import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "./reducers/authSlice.js";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import workspaceReducer from "./reducers/workspaceSlice.js";
import spotifyReducer from "./reducers/spotifySlice.js";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  workspace: workspaceReducer,
  spotify: spotifyReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

export const store = configureStore(
  {
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
  },
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
