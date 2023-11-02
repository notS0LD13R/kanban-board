import { NextRequest, NextResponse } from "next/server";
import prisma from "../utils/prisma";
import { createToken } from "../utils/jwt";

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const res = await prisma.user.findUnique({
            where: { email: req.email, password: req.password },
        });
        if (!res) throw new Error("Invalid Credentials");

        return NextResponse.json(
            {
                message: "User Logged In",
                payload: {
                    accessToken: createToken({ id: res.id }),
                    refreshToken: createToken({ id: res.id }, "1d", true),
                },
            },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: (err as any).message || "Login Failed" },
            { status: 400 }
        );
    }
}
