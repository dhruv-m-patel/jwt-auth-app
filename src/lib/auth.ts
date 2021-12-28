import axios from "axios";
import store from "store";
import getApiUrl from "../utils/getApiUrl";

export async function login(email: string, password: string) {
    return axios.post(getApiUrl("/login"), { email, password });
}

export async function register(email: string, password: string) {
    return axios.post(getApiUrl("/register"), {
        email,
        password,
    });
}

export async function logout() {
    return axios.delete(getApiUrl("/logout"), {
        headers: {
            Authorization: `Bearer ${store.get("ACCESS_TOKEN")}`,
        },
    });
}

export async function refreshSession() {
    return axios.post(
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
}

export async function verifySession() {
    return axios.post(
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
}
