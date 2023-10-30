import { sign, verify } from "jsonwebtoken";

/**
* Checks if the private key is accessible otherwise throws an error

*/
function checkForKey() {
    if (!process.env.JWT_ACCESS_PRIVATE_KEY)
        throw new Error("private key missing");
}

/**
 * Generates an access token for data
 * @param data json to be signed
 * @returns returns the token
 */
export function createToken(data: any) {
    console.log(process.env.JWT_ACCESS_PRIVATE_KEY);
    checkForKey();
    const token = sign(data, process.env.JWT_ACCESS_PRIVATE_KEY!, {
        expiresIn: "60s",
    });

    return token;
}

/**
 * Verfies a token and extract the data inside it
 * @param token jwt token
 * @returns returns the extracted data
 */
export function verifyToken(token: string) {
    console.log(token);
    checkForKey();
    const data = verify(token, process.env.JWT_ACCESS_PRIVATE_KEY!);
    return data;
}
