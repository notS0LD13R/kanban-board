import gateway from "@/services/gateway";
import { kanbanRoutes } from "@/services/routes";
import { CardGroup_T } from "../KanbanBoard";
import { AxiosError } from "axios";
import { Card_T } from "../Card";

export async function getTasks({
    success,
    error,
}: {
    success?: (msg: string) => void;
    error?: (msg: string) => void;
}) {
    try {
        const res = await gateway.get(kanbanRoutes.tasks);

        if (success) success(res.data.message);
        return res.data.payload.task;
    } catch (err) {
        if (error) {
            if (err instanceof AxiosError) error(err.response!.data.message);
            else error(err!.toString());
        }
        return [];
    }
}

export async function addTask({
    card,
    success,
    error,
}: {
    card: CardGroup_T;
    success?: (msg: string) => void;
    error?: (msg: string) => void;
}) {
    try {
        await gateway.post(kanbanRoutes.tasks, {
            id: card.card.id,
            order: 1,
            col: card.colID,
            head: card.card.head,
            para: card.card.para,
        });
        if (success) success("Task created");
    } catch (err) {
        if (error) {
            if (err instanceof AxiosError) error(err.response!.data.message);
            else error(err!.toString());
        }
    }
}

export async function deleteTask({
    cardId,
    success,
    error,
}: {
    cardId: string;
    success?: (msg: string) => void;
    error?: (msg: string) => void;
}) {
    try {
        await gateway.delete(kanbanRoutes.tasks, {
            params: { id: cardId },
        });
        if (success) success("Task created");
    } catch (err) {
        if (error) {
            if (err instanceof AxiosError) error(err.response!.data.message);
            else error(err!.toString());
        }
    }
}

export async function updateTask({
    card,
    success,
    error,
}: {
    card: Partial<Card_T>;
    success?: (msg: string) => void;
    error?: (msg: string) => void;
}) {
    try {
        await gateway.patch(kanbanRoutes.tasks, {
            id: card.id,
            ...(card.head && { head: card.head }),
            ...(card.para && { para: card.para }),
        });
        if (success) success("Task created");
    } catch (err) {
        if (error) {
            if (err instanceof AxiosError) error(err.response!.data.message);
            else error(err!.toString());
        }
    }
}
