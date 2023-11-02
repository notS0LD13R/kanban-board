import { NextRequest, NextResponse } from "next/server";
import { loginReq } from "../../types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createToken } from "../utils/jwt";
import prisma from "../utils/prisma";

export async function POST(request: NextRequest) {
    try {
        const req: loginReq = await request.json();

        const res = await prisma.user.create({
            data: {
                email: req.email,
                password: req.password,
                username: req.email.split("@")[0],
            },
        });

        return NextResponse.json(
            {
                message: "User registered",
                payload: {
                    accessToken: createToken({ id: res.id }),
                    refreshToken: createToken({ id: res.id }, "1d", true),
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        const response = { message: "User registeration failed", status: 500 };
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                response.message = "Email already in use";
                response.status = 409;
            } else if (error.code === "P2025") {
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
