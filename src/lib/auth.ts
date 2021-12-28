import axios from "axios";
import store from "store";
import getApiUrl from "../utils/getApiUrl";

function setTokens(tokens: {
    accessToken: string;
    accessTokenExpiry: string;
    accessTokenExpiresIn: number;
    refreshToken: string;
    refreshTokenExpiry: string;
    refreshTokenExpiresIn: number;
}) {
    store.set("ACCESS_TOKEN", tokens.accessToken);
    store.set("ACCESS_TOKEN_EXPIRY", tokens.accessTokenExpiry);
    store.set("ACCESS_TOKEN_EXPIRES_IN", tokens.accessTokenExpiresIn);
    store.set("REFRESH_TOKEN", tokens.refreshToken);
    store.set("REFRESH_TOKEN_EXPIRY", tokens.refreshTokenExpiry);
    store.set("REFRESH_TOKEN_EXPIRES_IN", tokens.refreshTokenExpiresIn);
}

export function getTokens() {
    return {
        accessToken: store.get("ACCESS_TOKEN"),
        accessTokenExpiry: store.get("ACCESS_TOKEN_EXPIRY"),
        accessTokenExpiresIn: Number(store.get("ACCESS_TOKEN_EXPIRES_IN")),
        refreshToken: store.get("REFRESH_TOKEN"),
        refreshTokenExpiry: store.get("REFRESH_TOKEN_EXPIRY"),
        refreshTokenExpiresIn: Number(store.get("REFRESH_TOKEN_EXPIRES_IN")),
    };
}

export async function login(email: string, password: string) {
    const res = await axios.post(getApiUrl("/login"), { email, password });
    setTokens(res.data);
    window.location.href = "/home";
}

export async function register(email: string, password: string) {
    const res = await axios.post(getApiUrl("/register"), {
        email,
        password,
    });
    if (res.status >= 200) {
        alert("Your account has been created");
        setTimeout(() => {
            window.location.href = "/login";
        }, 1000);
    } else {
        console.error("Unable to register");
    }
}

export async function logout() {
    try {
        await axios.delete(getApiUrl("/logout"), {
            headers: {
                Authorization: `Bearer ${store.get("ACCESS_TOKEN")}`,
            },
        });
    } catch {
    } finally {
        store.clearAll();
        window.location.href = "/login";
    }
}

export async function refreshSession() {
    const res = await axios.post(
        getApiUrl("/tokens/refresh"),
        {
            refreshToken: store.get("REFRESH_TOKEN"),
        },
        {
            headers: {
                Authorization: `Bearer ${store.get("ACCESS_TOKEN")}`,
            },
        }
    );
    setTokens(res.data);
}

export async function verifySession() {
    const res = await axios.post(
        getApiUrl("/tokens/verify"),
        {
            refreshToken: store.get("REFRESH_TOKEN"),
        },
        {
            headers: {
                Authorization: `Bearer ${store.get("ACCESS_TOKEN")}`,
            },
        }
    );
    if (res.status !== 200) {
        window.location.href = "/login";
    }
}
