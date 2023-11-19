import axios from "axios";
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
        if (err.status === 469) {
            // console.log("gateway", err.message);
        }

        return Promise.reject(err);
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
