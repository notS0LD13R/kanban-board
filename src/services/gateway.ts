import axios from "axios";

const gateway = axios.create({
    baseURL: "api/",
    headers: {
        "Content-Type": "application/json",
    },
});

gateway.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = "Bearer :)";
        return config;
    },
    (err) => Promise.reject(err)
);

gateway.interceptors.response.use(
    (response) => {
        console.log(response);
        return response;
    },
    (err) => Promise.reject(err)
);

export default gateway;
