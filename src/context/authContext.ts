import { createContext } from "react";

export interface AuthContextValue {
    tokens?: {
        accessToken: string;
        accessTokenExpiresIn: number;
        refreshToken: string;
        refreshTokenExpiresIn: number;
    };
}

const authContext = createContext<AuthContextValue>({});

export default authContext;
