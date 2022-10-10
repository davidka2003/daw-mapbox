import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { WalletProvider } from "@hooks/WalletProvider";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "@store/store";
import MapProvider from "@hooks/map/MapProvider";
import DimensionsProvider from "@hooks/other/dimensions";
const root = ReactDOM.createRoot(document.getElementById("root")!);
import { faUser, faClose, faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faUser, faClose, faSave, faTrashCan);
root.render(
  <Router>
    <DimensionsProvider>
      <Provider store={store}>
        <WalletProvider>
          <MapProvider>
            <App />
          </MapProvider>
        </WalletProvider>
      </Provider>
    </DimensionsProvider>
  </Router>
);
