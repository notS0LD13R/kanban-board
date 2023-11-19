import { NextRequest, NextResponse } from "next/server";
import prisma from "../utils/prisma";

export async function GET(request: NextRequest) {
    try {
        return NextResponse.json(
            {
                message: "Task retrieved",
            },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: (err as any).message || "Task retrieval failed" },
            { status: 400 }
        );
    }
}
