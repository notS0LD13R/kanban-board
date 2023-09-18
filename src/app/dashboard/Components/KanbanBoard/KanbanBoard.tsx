"use client";

import React, { useState } from "react";

import "./KanbanBoard.scss";
import icons from "@/app/assets/icons";

import Card, { Card_T } from "./Card";

type CardGroup_T = {
    card: Card_T;
    colID: string;
};

export default function KanbanBoard() {
    const cols = [
        { head: "To-Do List" },
        { head: "In Progress" },
        { head: "Done" },
        { head: "Revised" },
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
            },
            colID: "Revised",
        },
    ]);

    return (
        <div className="kanban-board">
            {cols.map((col, index) => (
                <Columns
                    cards={cards
                        .filter((card) => card.colID === col.head)
                        .map((card) => card.card)}
                    {...col}
                    key={`kanCol${index}`}
                />
            ))}
        </div>
    );
}

function Columns(props: { head: string; cards: Card_T[] }) {
    return (
        <div className="col">
            <h2>
                {props.head} <icons.Plus />{" "}
            </h2>
            {props.cards.map((card, index) => (
                <Card {...card} key={`${card.head}`} />
            ))}
        </div>
    );
}
