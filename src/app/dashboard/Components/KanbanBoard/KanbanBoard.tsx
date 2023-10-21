"use client";

import React, { useState, useContext, createContext } from "react";
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
type KanbanContext_T = {
    handleCardAdd: () => void;
    handleCardEdit: (cardId: string, newValues: Partial<Card_T>) => void;
    handleCardDelete: (cardId: string) => void;
};
const KanbanContext = createContext<KanbanContext_T | null>(null);

export const useKanban = () => {
    return useContext(KanbanContext);
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
                created_date: new Date("10-14-2023"),
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
                created_date: new Date("10-13-2023"),
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
                created_date: new Date("10-12-2023"),
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
                created_date: new Date("10-11-2023"),
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
                created_date: new Date("10-10-2023"),
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
                created_date: new Date("10-14-2023"),
                id: uuid(),
            },
            colID: "Revised",
        },
    ]);
    const colors = ["#FFAB2D", "#5ECFFF", "#FF4A55", "#38E25D"];

    const handleCardAdd = () => {
        const template = {
            card: {
                head: "Enter Heading",
                color: colors[Math.floor(Math.random() * colors.length)],
                para: "Enter a description",
                progress: 0,
                users: [{}],
                created_date: new Date(),
                id: uuid(),
            },
            colID: "To-Do List",
        };
        setCards([template, ...cards]);
    };

    const handleCardDelete = (cardId: string) => {
        setCards((cards) => cards.filter((card) => card.card.id !== cardId));
    };

    const handleCardEdit = (cardId: string, newValues: Partial<Card_T>) => {
        setCards((cards) => {
            //find index of card to be edited
            const selectedCardPos = cards.findIndex(
                (card) => card.card.id === cardId
            );
            //replace all the values from newValues in selectedCard
            cards[selectedCardPos].card = {
                ...cards[selectedCardPos].card,
                ...newValues,
            };
            return cards;
        });
    };

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;

        if (active && over)
            setCards((cards) => {
                const tempArr = arrayMove(
                    cards,
                    cardPos(active),
                    cardPos(over)
                );
                return tempArr[0] ? tempArr : [];
            });
    };

    const handleDragOver = (e: DragOverEvent) => {
        const { active, over, collisions } = e;
        if (
            !active ||
            !over ||
            colId(active) === colId(over) ||
            colId(active) === null ||
            colId(over) === null
        )
            return;

        const tempCards = [...cards];
        tempCards.filter((card) => card.card.id === active.id)[0].colID =
            colId(over);

        setCards(tempCards);
    };

    function colId(obj: Active | Over) {
        if (cols.map((col) => col.id).includes(obj.id as string)) return obj.id;
        if (obj.data.current && obj.data.current.sortable)
            return obj.data.current.sortable.containerId;
        else return null;
    }
    function cardPos(obj: Active | Over) {
        return cards.findIndex((card) => card.card.id === obj.id);
    }

    const contextValues: KanbanContext_T = {
        handleCardAdd: handleCardAdd,
        handleCardEdit: handleCardEdit,
        handleCardDelete: handleCardDelete,
    };
    return (
        <KanbanContext.Provider value={contextValues}>
            <DndContext
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                collisionDetection={closestCorners}
            >
                <div className="kanban-board">
                    {cols.map((col, index) => (
                        <Column
                            cards={
                                cards.length
                                    ? cards
                                          .filter(
                                              (card) =>
                                                  card &&
                                                  card.colID === col.head
                                          )
                                          .map((card) => card.card)
                                    : []
                            }
                            {...col}
                            key={`kanCol${index}`}
                        />
                    ))}
                </div>
            </DndContext>
        </KanbanContext.Provider>
    );
}
