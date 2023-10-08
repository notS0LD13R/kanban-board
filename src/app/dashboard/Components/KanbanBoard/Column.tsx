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
    const { setNodeRef } = useDroppable({
        id: props.id,
    });

    return (
        <SortableContext
            items={props.cards}
            strategy={verticalListSortingStrategy}
        >
            <div className="col" ref={setNodeRef}>
                <h2>
                    {props.head} <icons.Plus />{" "}
                </h2>
                {props.cards.map((card, index) => (
                    <Card {...card} key={`${card.head}${index}`} />
                ))}
            </div>
        </SortableContext>
    );
}
