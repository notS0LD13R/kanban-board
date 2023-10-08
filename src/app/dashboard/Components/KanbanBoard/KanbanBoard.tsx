"use client";

import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { v4 as uuid } from "uuid";
import { Card_T } from "./Card";

import "./KanbanBoard.scss";
import Column from "./Column";

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
    const handleDragEnd = (e) => {
        console.log(e);
    };
    return (
        <div className="kanban-board">
            <DndContext onDragEnd={handleDragEnd}>
                {cols.map((col, index) => (
                    <Column
                        cards={cards
                            .filter((card) => card.colID === col.head)
                            .map((card) => card.card)}
                        {...col}
                        key={`kanCol${index}`}
                    />
                ))}
            </DndContext>
        </div>
    );
}
