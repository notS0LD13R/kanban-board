"use client";

import React, { CSSProperties, useState } from "react";

import icons from "@/app/assets/icons";

import { ProgressBar, UsersCircle } from "../TopBoard/TopBoard";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { calculateDaysDifference } from "./utils";
import { useKanban } from "./KanbanBoard";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export type Card_T = {
    head: string;
    color: string;
    para: string;
    progress: number;
    created_date: Date;
    users: any[];
    id: string;
};
type CardMenu_T = {
    active: boolean;
    handleDelete: () => void;
};

export default function Card(props: Card_T) {
    const [state, setState] = useState<"menu" | "edit" | null>(null);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: props.id,
        disabled: !!state,
    });

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        ...(isDragging && { zIndex: 69 }),
    };
    const { handleCardDelete, handleCardEdit } = useKanban()!;
    return (
        <div
            className="card"
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
        >
            <div className="row">
                <div
                    className="head-circle"
                    style={{ backgroundColor: props.color }}
                />
                <h2>{props.head}</h2>
                <div className="card-menu-container">
                    <icons.Dotsmenu
                        onMouseDown={() =>
                            setState((state) =>
                                state === "menu" ? null : "menu"
                            )
                        }
                    />
                    <CardMenu
                        active={state === "menu"}
                        handleDelete={() => handleCardDelete(props.id)}
                    />
                </div>
            </div>
            <p>{props.para}</p>
            <div className="progress-container">
                <ProgressBar color={props.color} progress={props.progress} />
            </div>

            <div className="row">
                <UsersCircle users={props.users} />
                <span className="lesser-text">
                    <icons.Clock />{" "}
                    {calculateDaysDifference(props.created_date)} more days
                </span>
            </div>
        </div>
    );
}

function CardMenu(props: CardMenu_T) {
    if (!props.active) return <></>;
    return (
        <div className="card-menu">
            <span>
                {" "}
                <AiFillEdit /> Edit
            </span>
            <span onClick={props.handleDelete}>
                {" "}
                <AiFillDelete />
                Delete
            </span>
        </div>
    );
}
