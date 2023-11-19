import { SignJWT, jwtVerify } from "jose";

/**
 * Generates an access token for data
 * @param data json to be signed
 * @returns returns the token
 */
export async function createToken(
    data: any,
    expiresIn?: string,
    refresh?: boolean
) {
    const key = getKey(refresh);

    // if (!refresh) throw new Error("private key missing");

    const token = await new SignJWT(data)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime(expiresIn || "1m")
        .sign(key);

    return token;
}

/**
 * Verfies a token and extract the data inside it
 * @param token jwt token
 * @returns returns the extracted data
 */
export async function verifyToken(token: string, refresh?: boolean) {
    const key = getKey(refresh);
    try {
        return (await jwtVerify(token, key)).payload;
    } catch (err) {
        return false;
    }
}

function getKey(refresh?: boolean) {
    if (!refresh && process.env.JWT_ACCESS_PRIVATE_KEY) {
        return new TextEncoder().encode(process.env.JWT_ACCESS_PRIVATE_KEY);
    } else if (refresh && process.env.JWT_REFRESH_PRIVATE_KEY) {
        return new TextEncoder().encode(process.env.JWT_REFRESH_PRIVATE_KEY);
    } else {
        throw new Error("private key missing");
    }
}
