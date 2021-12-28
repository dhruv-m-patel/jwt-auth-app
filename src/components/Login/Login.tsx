import React, { useState, useCallback, ChangeEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Alert, Button, Input, Typography } from "@mui/material";
import validator from "validator";
import Center from "../Center";
import Frame from "../Frame";
import Page from "../Page";
import { login } from "../../lib/auth";
import { useStore } from "../../store";
import axios from "axios";

export default function Login(): JSX.Element {
    const store = useStore();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginError, setLoginError] = useState<string>("");

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
        const attemptLogin = async () => {
            try {
                const res = await login(email, password);
                store.setTokens(res.data);
                navigate("/home");
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setLoginError(err.response?.data?.message);
                } else {
                    setLoginError("Credentials could not be verified");
                }
            }
        };
        attemptLogin();
    }, [email, password, store, navigate]);

    if (store.tokens?.accessToken && store.tokens?.refreshToken) {
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
                {!!loginError && (
                    <React.Fragment>
                        <Alert color="error" icon={false}>
                            {loginError}
                        </Alert>
                        <br />
                        <br />
                    </React.Fragment>
                )}
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    data-testid="loginButton"
                    fullWidth
                    onClick={handleLogin}
                    disabled={
                        !email ||
                        !password ||
                        !validator.isEmail(email) ||
                        !validator.isStrongPassword(password)
                    }
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
