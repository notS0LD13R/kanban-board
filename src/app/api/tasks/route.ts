import { NextRequest, NextResponse } from "next/server";
import prisma from "../utils/prisma";
import { Prisma } from "@prisma/client";
import { verifyToken } from "../utils/jwt";

type POST_req = {
    cards: { id: string; col: string; order: number }[];
};

export async function GET(request: NextRequest) {
    const access = request.headers.get("authorization")?.split(" ")[1];
    const id = ((await verifyToken(access!)) as { id: string }).id;
    try {
        const tasks = await prisma.user.findUnique({
            where: { id: id! },
            select: {
                username: true,
                task: {
                    select: {
                        id: true,
                        col: true,
                        head: true,
                        para: true,
                        created_date: true,
                    },
                },
            },
        });
        return NextResponse.json(
            { message: "Task Fetched", payload: tasks },
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

export async function POST(request: NextRequest) {
    const req = await request.json();
    const access = request.headers.get("authorization")?.split(" ")[1];
    const user_id = ((await verifyToken(access!)) as { id: string }).id;
    try {
        prisma;
        const res = await prisma.task.create({
            data: {
                ...req,
                user_id: user_id,
                created_date: new Date(),
            },
        });
        return NextResponse.json({ message: "Task Created" }, { status: 200 });
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

export async function PATCH(request: NextRequest) {
    const req = await request.json();
    const access = request.headers.get("authorization")?.split(" ")[1];
    const user_id = ((await verifyToken(access!)) as { id: string }).id;

    try {
        const res = await prisma.task.update({
            where: {
                id: req.id,
                user_id: user_id,
            },
            //only head and para can be changed
            data: {
                ...(req.head && { head: req.head }),
                ...(req.para && { para: req.para }),
            },
        });
        return NextResponse.json({ message: "Task Edited" }, { status: 200 });
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

export async function PUT(request: NextRequest) {
    const req: POST_req = await request.json();
    const access = request.headers.get("authorization")?.split(" ")[1];
    const user_id = ((await verifyToken(access!)) as { id: string }).id;

    try {
        const res = await prisma.$transaction(
            req.cards.map((card) =>
                prisma.task.update({
                    where: { id: card.id, user_id: user_id },
                    data: { col: card.col, order: card.order },
                })
            )
        );
        return NextResponse.json(
            { message: "Tasks Relocated" },
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

export async function DELETE(request: NextRequest) {
    try {
        const req = request.nextUrl.searchParams;
        const access = request.headers.get("authorization")?.split(" ")[1];
        const user_id = ((await verifyToken(access!)) as { id: string }).id;
        const id = req.get("id");
        if (!id) throw new Error("Id missing");

        const res = await prisma.task.delete({
            where: {
                id: id,
                user_id: user_id,
            },
        });
        return NextResponse.json({ message: "Task Deleted" }, { status: 200 });
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
