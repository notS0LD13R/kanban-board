import { NextRequest, NextResponse } from "next/server";
import { verifyToken, createToken } from "../../utils/jwt";

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const id = (
            (await verifyToken(req.refreshToken, true)) as { id: string }
        ).id;
        if (!id) throw new Error("Invalid refresh token");
        return NextResponse.json(
            {
                message: "Token refreshed",
                payload: {
                    accessToken: await createToken({ id: id }),
                    refreshToken: await createToken({ id: id }, "1d", true),
                },
            },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: (err as any).message || "Refresh Failed" },
            { status: 400 }
        );
    }
}
