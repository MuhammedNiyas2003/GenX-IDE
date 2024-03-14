import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
//redux and redux-persist
import { persistor, store } from "./state/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
//adobe specturm
import {
  defaultTheme,
  Provider as SpectrumProvider,
} from "@adobe/react-spectrum";
import { ToastContainer } from "@react-spectrum/toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SpectrumProvider theme={defaultTheme}>
          <ToastContainer />
          <App />
        </SpectrumProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
