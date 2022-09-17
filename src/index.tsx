import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import WalletProvider from "./hooks/WalletProvider";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  /* @ts-ignore */
  <Router>
    <WalletProvider>
      <App />
    </WalletProvider>
  </Router>
  // <React.StrictMode>
  // </React.StrictMode>
);
