import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import storeJs from "store";
import { Tokens } from "../types";

export class TokenStore {
    tokens?: Tokens;

    constructor() {
        this.tokens = undefined;
        makeAutoObservable(this);
    }

    setTokens(tokens: Tokens) {
        storeJs.set("ACCESS_TOKEN", tokens.accessToken);
        storeJs.set("ACCESS_TOKEN_EXPIRY", tokens.accessTokenExpiry);
        storeJs.set("ACCESS_TOKEN_EXPIRES_IN", tokens.accessTokenExpiresIn);
        storeJs.set("REFRESH_TOKEN", tokens.refreshToken);
        storeJs.set("REFRESH_TOKEN_EXPIRY", tokens.refreshTokenExpiry);
        storeJs.set("REFRESH_TOKEN_EXPIRES_IN", tokens.refreshTokenExpiresIn);
        this.tokens = tokens;
    }

    getTokens() {
        return this.tokens;
    }

    clearTokens() {
        storeJs.clearAll();
        this.tokens = undefined;
    }
}

const authContext = createContext<TokenStore>(new TokenStore());

export default authContext;
