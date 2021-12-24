import { Button, Input, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Center from "../Center";
import Frame from "../Frame";
import Page from "../Page";

export default function Login(): JSX.Element {
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
                />
                <p />
                <p />
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    data-testid="loginButton"
                    fullWidth
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
