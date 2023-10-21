import { PrismaClient, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const client = new PrismaClient();
    try {
        const users = await client.user.findMany();
        await client.user.create({
            data: {
                username: "Nigga",
                email: "cotton@gmail.com",
                password: "123",
            },
        });
        return new Response(JSON.stringify({ payload: users }), {
            status: 200,
        });
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError)
            return new Response(JSON.stringify({ error: err.message }), {
                status: 400,
            });
    }
}
