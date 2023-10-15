"use client";

import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import Card, { Card_T } from "./Card";
import icons from "@/app/assets/icons";

export default function Column(props: {
    head: string;
    cards: Card_T[];
    id: string;
}) {
    const { setNodeRef, isOver } = useDroppable({
        id: props.id,
    });

    return (
        <SortableContext
            items={props.cards}
            id={props.id}
            strategy={verticalListSortingStrategy}
        >
            <div
                className={"col" + (isOver ? " is-over" : "")}
                ref={setNodeRef}
            >
                <h2>
                    {props.head} {props.id === "To-Do List" && <icons.Plus />}{" "}
                </h2>
                {props.cards.map((card) => (
                    <Card {...card} key={`${card.id}`} />
                ))}
            </div>
        </SortableContext>
    );
}
