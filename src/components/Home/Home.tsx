import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext, { AuthContextValue } from "../../context/authContext";
import Page from "../Page";

export default function Home(): JSX.Element {
    const { tokens } = useContext<AuthContextValue>(AuthContext);

    if (!tokens?.accessToken || !tokens?.refreshToken) {
        return <Navigate to="/login" />;
    }

    return <Page>Home</Page>;
}
