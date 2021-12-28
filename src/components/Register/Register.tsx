import React, { ChangeEvent, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Input, Typography } from "@mui/material";
import validator from "validator";
import Center from "../Center";
import Frame from "../Frame";
import Page from "../Page";
import { register } from "../../lib/auth";

export default function Register(): JSX.Element {
    const [email, setEmail] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);
    const [password, setPassword] = useState<string>("");
    const [confirmedPassword, setConfirmedPassword] = useState<string>("");

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

    const handleConfirmPasswordChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setConfirmedPassword(e.target.value);
        },
        []
    );

    const handleRegistration = useCallback(() => {
        const newErrors = [];
        if (!validator.isEmail(email)) {
            newErrors.push("Please enter a valid email");
        }
        if (!validator.isStrongPassword(password)) {
            newErrors.push("Please enter a strong password");
        }
        setErrors(newErrors);
        if (!newErrors.length) {
            register(email, password);
        }
    }, [email, password]);

    return (
        <Page>
            <Frame title="Register">
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
                <Input
                    inputProps={{
                        type: "password",
                        "data-testid": "confirmPasswordInput",
                        id: "confirmPasswordInput",
                    }}
                    fullWidth
                    placeholder="Confirm Password"
                    value={confirmedPassword}
                    onChange={handleConfirmPasswordChange}
                />
                <p />
                <p />
                {!!errors?.length && (
                    <React.Fragment>
                        <Alert color="error" icon={false}>
                            <ul>
                                {errors.map((e) => (
                                    <li key={e}>{e}</li>
                                ))}
                            </ul>
                        </Alert>
                        <p />
                        <p />
                    </React.Fragment>
                )}
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    data-testid="loginButton"
                    fullWidth
                    disabled={
                        !email?.length ||
                        !password?.length ||
                        password !== confirmedPassword
                    }
                    onClick={handleRegistration}
                >
                    Register
                </Button>
                <p />
                <Center>
                    <Typography variant="subtitle2">
                        <Link to="/login">I already have an account</Link>
                    </Typography>
                </Center>
            </Frame>
        </Page>
    );
}
