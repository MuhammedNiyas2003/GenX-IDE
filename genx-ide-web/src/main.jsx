import React from "react";
import ReactDOM from "react-dom/client";
import { persistor, store } from "./state/store.js";
import "./index.scss";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import App from "./App.jsx";
import {
  defaultTheme,
  Provider as SpectrumProvider,
} from "@adobe/react-spectrum";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SpectrumProvider theme={defaultTheme}>
            <App />
          </SpectrumProvider>
        </PersistGate>
      </Provider>
  </React.StrictMode>
);
