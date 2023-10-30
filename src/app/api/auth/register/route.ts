import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { loginReq } from "../../types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createToken, verifyToken } from "../utils/jwt";

export async function POST(request: NextRequest) {
    try {
        const req: loginReq = await request.json();
        const prisma = new PrismaClient();
        const res = await prisma.user.create({
            data: {
                email: req.email,
                password: req.password,
                username: req.email.split("@")[0],
            },
        });
        console.log(res);
        const accessToken = createToken({ id: res.id });
        return NextResponse.json(
            {
                message: "User registered",
                payload: { access_token: accessToken },
            },
            { status: 200 }
        );
    } catch (error) {
        const response = { message: "User registeration failed", status: 500 };
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                // Unique constraint violation (e.g., email already exists)
                response.message = "Email already in use";
                response.status = 409;
            } else if (error.code === "P2025") {
                // Invalid data provided (e.g., required fields missing)
                response.message = "Invalid user data";
                response.status = 400;
            }
        }
        return NextResponse.json(
            { message: response.message },
            { status: response.status }
        );
    }
}
