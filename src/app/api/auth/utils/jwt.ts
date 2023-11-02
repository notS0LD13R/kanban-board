import { sign, verify } from "jsonwebtoken";

/**
 * Generates an access token for data
 * @param data json to be signed
 * @returns returns the token
 */
export function createToken(data: any, expiresIn?: string, refresh?: boolean) {
    const token = sign(
        data,
        refresh
            ? process.env.JWT_REFRESH_PRIVATE_KEY!
            : process.env.JWT_ACCESS_PRIVATE_KEY!,
        {
            expiresIn: expiresIn || "60s",
        }
    );

    return token;
}

/**
 * Verfies a token and extract the data inside it
 * @param token jwt token
 * @returns returns the extracted data
 */
export function verifyToken(token: string) {
    if (!process.env.JWT_ACCESS_PRIVATE_KEY)
        throw new Error("private key missing");
    const data = verify(token, process.env.JWT_ACCESS_PRIVATE_KEY);
    return data;
}
