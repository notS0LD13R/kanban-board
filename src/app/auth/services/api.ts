import gateway from "@/services/gateway";
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
        if (success) success((res as any).data.message as string);
    } catch (err) {
        if (err instanceof AxiosError)
            if (error) error((err as any).response.data.message as string);
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

        if (success) success((res as any).response.data.message as string);
    } catch (err) {
        if (error) error((err as any).response.data.message as string);
    }
}
