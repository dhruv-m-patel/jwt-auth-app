import React, { useState, useCallback, ChangeEvent, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, Input, Typography } from "@mui/material";
import Center from "../Center";
import Frame from "../Frame";
import Page from "../Page";
import { login } from "../../lib/auth";
import AuthContext, { AuthContextValue } from "../../context/authContext";

export default function Login(): JSX.Element {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { tokens } = useContext<AuthContextValue>(AuthContext);

    const handleEmailChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
        },
        []
    );

    const handlePasswordChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
        },
        []
    );

    const handleLogin = useCallback(() => {
        login(email, password);
    }, [email, password]);

    if (tokens?.accessToken && tokens?.refreshToken) {
        return <Navigate to="/home" />;
    }

    return (
        <Page>
            <Frame title="Login">
                <Input
                    inputProps={{
                        type: "email",
                        "data-testid": "emailInput",
                        id: "emailInput",
                    }}
                    fullWidth
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <p />
                <Input
                    inputProps={{
                        type: "password",
                        "data-testid": "passwordInput",
                        id: "passwordInput",
                    }}
                    fullWidth
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <p />
                <p />
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    data-testid="loginButton"
                    fullWidth
                    onClick={handleLogin}
                >
                    Login
                </Button>
                <p />
                <Center>
                    <Typography variant="subtitle2">
                        <Link to="/register">I don't have an account yet</Link>
                    </Typography>
                </Center>
            </Frame>
        </Page>
    );
}
