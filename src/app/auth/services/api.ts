import gateway, { setTokens } from "@/services/gateway";
import { authRoutes } from "@/services/routes";
import { Axios, AxiosError } from "axios";

export async function register({
    email,
    password,
    success,
    error,
}: {
    email: string;
    password: string;
    success?: (msg: string) => void;
    error?: (msg: string) => void;
}) {
    try {
        const res = await gateway.post(authRoutes.register, {
            email: email,
            password: password,
        });
        setTokens(res.data.payload.accessToken, res.data.payload.refreshToken);
        if (success) success((res as any).data.message as string);
    } catch (err) {
        if (error) {
            if (err instanceof AxiosError) error(err.response!.data.message);
            else error(err!.toString());
        }
    }
}

export async function login({
    email,
    password,
    success,
    error,
}: {
    email: string;
    password: string;
    success?: (msg: string) => void;
    error?: (msg: string) => void;
}) {
    try {
        const res = await gateway.post(authRoutes.login, {
            email: email,
            password: password,
        });
        setTokens(res.data.payload.accessToken, res.data.payload.refreshToken);

        if (success) success(res.data.message);
    } catch (err) {
        if (error) {
            if (err instanceof AxiosError) error(err.response!.data.message);
            else error(err!.toString());
        }
    }
}

export async function verify() {
    try {
        await gateway.get(authRoutes.verify);
        return true;
    } catch (err) {
        console.log("error caught");
        return false;
    }
}
