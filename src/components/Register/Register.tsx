import React, { ChangeEvent, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Input, Typography } from "@mui/material";
import validator from "validator";
import Center from "../Center";
import Frame from "../Frame";
import Page from "../Page";
import { register } from "../../lib/auth";
import { useStore } from "../../store";
import axios from "axios";

export default function Register(): JSX.Element {
    const store = useStore();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);
    const [password, setPassword] = useState<string>("");
    const [confirmedPassword, setConfirmedPassword] = useState<string>("");
    const [registered, setRegistered] = useState<boolean>(false);
    const [registrationError, setRegistrationError] = useState<string>("");

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
        const attemptRegistration = async () => {
            try {
                await register(email, password);
                setRegistered(true);
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setRegistrationError(err.response?.data?.message);
                } else {
                    setRegistrationError("Unable to complete registration");
                }
            }
        };
        const newErrors = [];
        if (!validator.isEmail(email)) {
            newErrors.push("Please enter a valid email");
        }
        if (!validator.isStrongPassword(password)) {
            newErrors.push("Please enter a strong password");
        }
        setErrors(newErrors);
        if (!newErrors.length) {
            attemptRegistration();
        }
    }, [email, password, navigate]);

    return (
        <Page>
            <Frame title="Register">
                {registered ? (
                    <Alert color="success" icon={false}>
                        Your account has been created...
                    </Alert>
                ) : (
                    <React.Fragment>
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
                        {!!(errors?.length || registrationError) && (
                            <React.Fragment>
                                <Alert color="error" icon={false}>
                                    {registrationError || (
                                        <ul>
                                            {errors.map((e) => (
                                                <li key={e}>{e}</li>
                                            ))}
                                        </ul>
                                    )}
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
                                <Link to="/login">
                                    I already have an account
                                </Link>
                            </Typography>
                        </Center>
                    </React.Fragment>
                )}
            </Frame>
        </Page>
    );
}
