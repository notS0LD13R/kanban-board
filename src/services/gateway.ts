import axios from "axios";
import { authRoutes } from "./routes";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
const gateway = axios.create({
    baseURL: "api/",
    headers: {
        "Content-Type": "application/json",
    },
});

gateway.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
        return config;
    },
    (err) => Promise.reject(err)
);

gateway.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        if (err.response.status === 469) {
            const { config } = err;
            (async () => {
                try {
                    const res = await gateway.post(authRoutes.refresh, {
                        refreshToken: getRefreshToken(),
                    });
                    setTokens(
                        res.data.payload.accessToken,
                        res.data.payload.refreshToken
                    );
                    return gateway.request(config);
                } catch (err) {
                    console.log("here");
                    return NextResponse.redirect(
                        new URL("/auth", process.env.NEXT_PUBLIC_VERCEL_URL)
                    );
                }
            })();
        }
    }
);

export function setTokens(access?: string, refresh?: string) {
    if (access) localStorage.setItem("access_token", access);
    if (refresh) localStorage.setItem("refresh_token", refresh);
}
export function getAccessToken() {
    return localStorage.getItem("access_token");
}
export function getRefreshToken() {
    return localStorage.getItem("refresh_token");
}

export default gateway;
