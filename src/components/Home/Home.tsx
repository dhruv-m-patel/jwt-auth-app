import React, { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Alert, Button, Container } from "@mui/material";
import Page from "../Page";
import Center from "../Center";
import { logout, refreshSession, verifySession } from "../../lib/auth";
import { useStore } from "../../store";
import axios from "axios";

export default function Home(): JSX.Element {
    const store = useStore();
    const navigate = useNavigate();
    const [refreshError, setRefreshError] = useState<string>("");

    const handleRefreshTokens = useCallback(() => {
        const doSessionRefresh = async () => {
            try {
                const res = await refreshSession();
                store.setTokens(res.data);
                setTimeout(() => {
                    window.location.reload();
                }, 1 * 1000);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setRefreshError(err.response?.data?.message);
                } else {
                    setRefreshError("Unable to refresh tokens");
                }
            }
        };
        doSessionRefresh();
    }, [store]);

    const handleLogout = useCallback(() => {
        const attemptLogout = async () => {
            try {
                await logout();
            } catch (err) {
                console.error(err);
            } finally {
                store.clearTokens();
                navigate("/login");
            }
        };
        attemptLogout();
    }, [store, navigate]);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await verifySession();
                if (!res.data.valid) {
                    store.clearTokens();
                    navigate("/login");
                }
            } catch (err) {
                console.error(err);
            }
        };
        checkSession();
    });

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (store.tokens?.accessTokenExpiresIn) {
            const autoRefreshTokens = () => {
                timer = setTimeout(async () => {
                    try {
                        const res = await refreshSession();
                        store.setTokens(res.data);
                        window.location.reload();
                    } catch (err) {
                        if (axios.isAxiosError(err)) {
                            setRefreshError(err.response?.data?.message);
                        } else {
                            setRefreshError("Unable to auto-refresh tokens");
                        }
                    }
                }, Number(store.tokens?.accessTokenExpiresIn || 2000) * 1000);
            };
            autoRefreshTokens();
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [store]);

    if (!store.tokens?.accessToken || !store.tokens?.refreshToken) {
        return <Navigate to="/login" />;
    }

    return (
        <Page fluid>
            <h1>Home</h1>
            <Alert color="info" icon={false}>
                <strong>
                    The page is set to auto-refresh tokens before the Access
                    Token expires in {store.tokens.accessTokenExpiresIn}{" "}
                    seconds.
                    <br />
                    You can observe network calls to verify token refresh.
                </strong>
            </Alert>
            <h3>Auth Tokens</h3>
            <Alert color="success" icon={false}>
                <Container>
                    <code>
                        <strong>accessToken:</strong> {store.tokens.accessToken}
                        <br />
                        <strong>accessTokenExpiry:</strong>{" "}
                        {store.tokens.accessTokenExpiry}
                        <br />
                        <strong>accessTokenExpiresIn:</strong>{" "}
                        {store.tokens.accessTokenExpiresIn} seconds
                        <br />
                        <strong>refreshToken:</strong>{" "}
                        {store.tokens.refreshToken}
                        <br />
                        <strong>refreshTokenExpiry:</strong>{" "}
                        {store.tokens.refreshTokenExpiry}
                        <br />
                        <strong>refreshTokenExpiresIn:</strong>{" "}
                        {store.tokens.refreshTokenExpiresIn} seconds
                    </code>
                </Container>
            </Alert>
            <h3>Decoded Access Token</h3>
            <Alert color="success" icon={false}>
                <Container>
                    <code
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(
                                jwtDecode(store.tokens.accessToken)
                            ),
                        }}
                    />
                </Container>
            </Alert>
            <br />
            <br />
            {!!refreshError && (
                <React.Fragment>
                    <Alert color="error" icon={false}>
                        {refreshError}
                    </Alert>
                    <br />
                    <br />
                </React.Fragment>
            )}
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
