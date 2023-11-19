import { NextRequest, NextResponse } from "next/server";
import prisma from "../utils/prisma";
import { Prisma } from "@prisma/client";
import { verifyToken } from "../utils/jwt";

export async function GET(request: NextRequest) {
    const access = request.headers.get("authorization")?.split(" ")[1];
    const id = ((await verifyToken(access!)) as { id: string }).id;
    console.log({ id: id! });
    try {
        const user = await prisma.user.findUnique({
            where: { id: id! },
            select: {
                username: true,
                task: {
                    select: {
                        id: true,
                        order: true,
                        col: true,
                        head: true,
                        para: true,
                        created_date: true,
                    },
                },
            },
        });
        return NextResponse.json(
            { message: "Task Fetched", payload: user },
            { status: 200 }
        );
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError)
            return NextResponse.json({ error: err.message }, { status: 400 });
        else
            return NextResponse.json(
                { error: `Unknown Error ${err}` },
                { status: 400 }
            );
    }
}
