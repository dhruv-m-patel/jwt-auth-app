import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import reportWebVitals from "./reportWebVitals";
import Router from "./components/router";
import AuthContext from "./context/authContext";
import { getTokens } from "./lib/auth";
import "./index.css";

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline enableColorScheme>
            <BrowserRouter>
                <AuthContext.Provider value={{ tokens: getTokens() }}>
                    <Router />
                </AuthContext.Provider>
            </BrowserRouter>
        </CssBaseline>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
