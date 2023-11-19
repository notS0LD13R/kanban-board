import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./app/api/utils/jwt";
import { redirect } from "next/navigation";
import { stat } from "fs";

export async function middleware(request: NextRequest) {
    const exempt = ["/api/auth"];
    const access = request.headers.get("authorization")?.split(" ")[1];
    console.log(request.nextUrl.pathname);
    if (
        exempt.reduce(
            (acc, curr) => acc && !request.nextUrl.pathname.startsWith(curr),
            true
        )
    ) {
        console.log(access);
        if (!access)
            return NextResponse.json(
                {
                    message: "Token Missing",
                },
                { status: 469 }
            );
        if (!(await verifyToken(access)))
            return NextResponse.json(
                {
                    message: "Token Expired",
                },
                { status: 469 }
            );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/:path*"],
};
