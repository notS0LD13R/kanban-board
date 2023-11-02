import gateway from "@/services/gateway";
import { authRoutes } from "@/services/routes";

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
        if (success) success(res.data);
        //else console.log(res.data);
    } catch (err) {
        if (error) error(err as string);
        //else console.log(err);
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
        if (success) success(res.data);
        //else console.log(res.data);
    } catch (err) {
        if (error) error(err as string);
        //else console.log(err);
    }
}
