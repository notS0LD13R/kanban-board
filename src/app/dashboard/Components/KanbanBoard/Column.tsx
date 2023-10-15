"use client";

import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useKanban } from "./KanbanBoard";
import Card, { Card_T } from "./Card";

import icons from "@/app/assets/icons";

export default function Column(props: {
    head: string;
    cards: Card_T[];
    id: string;
}) {
    const { setNodeRef } = useDroppable({
        id: props.id,
    });
    const { handleCardAdd } = useKanban()!;
    return (
        <SortableContext
            items={props.cards}
            id={props.id}
            strategy={verticalListSortingStrategy}
        >
            <div className={"col"} ref={setNodeRef}>
                <h2>
                    {props.head}{" "}
                    {props.id === "To-Do List" && (
                        <icons.Plus onClick={handleCardAdd} />
                    )}{" "}
                </h2>
                {props.cards.map((card) => (
                    <Card {...card} key={`${card.id}`} />
                ))}
            </div>
        </SortableContext>
    );
}
