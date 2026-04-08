import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { store } from "./app/store.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0f172a",
              color: "#f8fafc",
              border: "1px solid rgba(148, 163, 184, 0.2)"
            }
          }}
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
