import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import reportWebVitals from "./reportWebVitals";
import Router from "./components/router";
import { TokenStore, StoreProvider } from "./store";
import "./index.css";

const store = new TokenStore();

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline enableColorScheme>
            <BrowserRouter>
                <StoreProvider store={store}>
                    <Router />
                </StoreProvider>
            </BrowserRouter>
        </CssBaseline>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
