import axios from "axios";
import { authRoutes } from "./routes";
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
    async (err) => {
        if (err.response.status === 469) {
            const { config } = err;

            try {
                const res = await gateway.post(authRoutes.refresh, {
                    refreshToken: getRefreshToken(),
                });
                setTokens(
                    res.data.payload.accessToken,
                    res.data.payload.refreshToken
                );
                return await gateway.request(config);
            } catch (err) {
                //find a way to trigger a redirect
            }
        } else return Promise.reject(err);
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
