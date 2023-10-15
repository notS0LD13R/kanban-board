"use client";

import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import {
    Active,
    DragEndEvent,
    DragOverEvent,
    Over,
    DndContext,
    closestCorners,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Card_T } from "./Card";
import Column from "./Column";

import "./KanbanBoard.scss";

type CardGroup_T = {
    card: Card_T;
    colID: string;
};

export default function KanbanBoard() {
    const cols = [
        { head: "To-Do List", id: "To-Do List" },
        { head: "In Progress", id: "In Progress" },
        { head: "Done", id: "Done" },
        { head: "Revised", id: "Revised" },
    ];
    const [cards, setCards] = useState<CardGroup_T[]>([
        {
            card: {
                head: "Important",
                color: "#FFAB2D",
                para: "Create sign up sheet for holiday student/parent conferences.",
                progress: 50,
                users: [{}, {}, {}],
                days: 10,
                id: uuid(),
            },
            colID: "To-Do List",
        },
        {
            card: {
                head: "Important",
                color: "#FFAB2D",
                para: "Create sign up sheet for holiday student/parent conferences.",
                progress: 50,
                users: [{}, {}, {}],
                days: 10,
                id: uuid(),
            },
            colID: "To-Do List",
        },
        {
            card: {
                head: "Important",
                color: "#FFAB2D",
                para: "Create sign up sheet for holiday student/parent conferences.",
                progress: 50,
                users: [{}, {}, {}],
                days: 10,
                id: uuid(),
            },
            colID: "To-Do List",
        },
        {
            card: {
                head: "Important",
                color: "#5ECFFF",
                para: "Create sign up sheet for holiday student/parent conferences.",
                progress: 50,
                users: [{}, {}, {}],
                days: 10,
                id: uuid(),
            },
            colID: "In Progress",
        },
        {
            card: {
                head: "Important",
                color: "#FF4A55",
                para: "Create sign up sheet for holiday student/parent conferences.",
                progress: 50,
                users: [{}, {}, {}],
                days: 10,
                id: uuid(),
            },
            colID: "Done",
        },
        {
            card: {
                head: "Important",
                color: "#38E25D",
                para: "Create sign up sheet for holiday student/parent conferences.",
                progress: 50,
                users: [{}, {}, {}],
                days: 10,
                id: uuid(),
            },
            colID: "Revised",
        },
    ]);

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
        if (active && over)
            setCards((cards) =>
                arrayMove(cards, cardPos(active), cardPos(over))
            );
    };

    const handleDragOver = (e: DragOverEvent) => {
        const { active, over, collisions } = e;
        console.log(active, over, collisions);
        if (!active || !over || colId(active) === colId(over)) return;
        try {
            const tempCards = [...cards];
            tempCards.filter((card) => card.card.id === active.id)[0].colID =
                colId(over);
            setCards(tempCards);
            console.log(colId(over));
        } catch (err) {
            console.log(err);
        }
    };

    function colId(obj: Active | Over) {
        if (cols.map((col) => col.id).includes(obj.id as string)) return obj.id;
        if (obj.data.current) return obj.data.current.sortable.containerId;
    }
    function cardPos(obj: Active | Over) {
        return cards.findIndex((card) => card.card.id === obj.id);
    }

    return (
        <DndContext
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            collisionDetection={closestCorners}
        >
            <div className="kanban-board">
                {cols.map((col, index) => (
                    <Column
                        cards={cards
                            .filter((card) => card.colID === col.head)
                            .map((card) => card.card)}
                        {...col}
                        key={`kanCol${index}`}
                    />
                ))}
            </div>
        </DndContext>
    );
}
