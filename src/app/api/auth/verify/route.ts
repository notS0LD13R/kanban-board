import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../utils/jwt";

export async function GET(request: NextRequest) {
    try {
        const access = request.headers.get("authorization")?.split(" ")[1];
        if (await verifyToken(access!))
            return NextResponse.json(
                { message: "Valid account" },
                { status: 200 }
            );
        else throw new Error("Invalid account");
    } catch (err) {
        return NextResponse.json(
            { message: (err as any).message || "Login Failed" },
            { status: 400 }
        );
    }
}
