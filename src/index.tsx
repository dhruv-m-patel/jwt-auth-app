import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import reportWebVitals from "./reportWebVitals";
import Router from "./components/router";
import "./index.css";

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline enableColorScheme>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </CssBaseline>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
