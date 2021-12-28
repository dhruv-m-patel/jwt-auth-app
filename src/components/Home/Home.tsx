import { Alert, Container } from "@mui/material";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import AuthContext, { AuthContextValue } from "../../context/authContext";
import Page from "../Page";

export default function Home(): JSX.Element {
    const { tokens } = useContext<AuthContextValue>(AuthContext);

    if (!tokens?.accessToken || !tokens?.refreshToken) {
        return <Navigate to="/login" />;
    }

    return (
        <Page fluid>
            <h1>Home</h1>
            <Alert color="info" icon={false}>
                <strong>
                    The page is set to auto-refresh tokens before the Access
                    Token expires in {tokens.accessTokenExpiresIn} seconds.
                    <br />
                    You can observe network calls to verify token refresh.
                </strong>
            </Alert>
            <h3>Auth Tokens</h3>
            <Container>
                <code>
                    <strong>accessToken:</strong> {tokens.accessToken}
                    <br />
                    <strong>accessTokenExpiry:</strong>{" "}
                    {tokens.accessTokenExpiry}
                    <br />
                    <strong>accessTokenExpiresIn:</strong>{" "}
                    {tokens.accessTokenExpiresIn} seconds
                    <br />
                    <strong>refreshToken:</strong> {tokens.refreshToken}
                    <br />
                    <strong>refreshTokenExpiry:</strong>{" "}
                    {tokens.refreshTokenExpiry}
                    <br />
                    <strong>refreshTokenExpiresIn:</strong>{" "}
                    {tokens.refreshTokenExpiresIn} seconds
                </code>
            </Container>
            <h3>Decoded Access Token</h3>
            <Container>
                <code
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(
                            jwtDecode(tokens.accessToken),
                            null,
                            "\t"
                        ),
                    }}
                />
            </Container>
        </Page>
    );
}
