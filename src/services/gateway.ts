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
        console.log(response);
        return response;
    },
    (err) => {
        if (err.status === 469) {
            console.log(err.message);
        }

        return Promise.reject(err);
    }
);

export function setTokens(access: string, refresh: string) {
    localStorage.setItem("access_token", access);
}
export function getAccessToken() {
    return localStorage.getItem("access_token");
}
export function getRefreshToken() {}

export default gateway;
