import React, { useCallback, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Alert, Button, Container } from "@mui/material";
import AuthContext, { AuthContextValue } from "../../context/authContext";
import Page from "../Page";
import Center from "../Center";
import { logout, refreshSession } from "../../lib/auth";

export default function Home(): JSX.Element {
    const { tokens } = useContext<AuthContextValue>(AuthContext);

    const handleRefreshTokens = useCallback(() => {
        refreshSession();
        setTimeout(() => {
            window.location.reload();
        }, 1 * 1000);
    }, []);

    const handleLogout = useCallback(() => {
        logout();
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (tokens?.accessTokenExpiresIn) {
            timer = setTimeout(() => {
                refreshSession();
            }, tokens.accessTokenExpiresIn * 1000);
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [tokens]);

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
            <Alert color="success" icon={false}>
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
            </Alert>
            <h3>Decoded Access Token</h3>
            <Alert color="success" icon={false}>
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
            </Alert>
            <br />
            <br />
            <Center>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleRefreshTokens}
                >
                    Refresh Tokens
                </Button>
                &nbsp; &nbsp;
                <Button
                    variant="contained"
                    color="error"
                    size="large"
                    onClick={handleLogout}
                >
                    Log Out
                </Button>
            </Center>
        </Page>
    );
}
