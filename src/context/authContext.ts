import { createContext } from "react";

export interface AuthContextValue {
    tokens?: {
        accessToken: string;
        accessTokenExpiry: string;
        accessTokenExpiresIn: number;
        refreshToken: string;
        refreshTokenExpiry: string;
        refreshTokenExpiresIn: number;
    };
}

const authContext = createContext<AuthContextValue>({});

export default authContext;
