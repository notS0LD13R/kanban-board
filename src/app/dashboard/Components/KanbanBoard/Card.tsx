"use client";

import React, { CSSProperties, useState, FormEvent } from "react";

import icons from "@/app/assets/icons";

import { ProgressBar, UsersCircle } from "../TopBoard/TopBoard";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { calculateDaysDifference } from "./utils";
import { useKanban } from "./KanbanBoard";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BiCheck, BiX } from "react-icons/bi";

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
    handleEditStart: () => void;
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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        //@ts-ignore
        const [head, para] = [e.target.head.value, e.target.para.value];
        console.log(head, para);
        handleCardEdit(props.id, {
            ...(head && { head: head }),
            ...(para && { para: para }),
        });
        setState(null);
    };

    return (
        <div
            className="card"
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
        >
            <form onSubmit={handleSubmit} onReset={() => setState(null)}>
                <div className="row">
                    <div
                        className="head-circle"
                        style={{ backgroundColor: props.color }}
                    />
                    <h2>
                        {state === "edit" ? (
                            <input
                                type="text"
                                defaultValue={props.head}
                                name="head"
                                id="head"
                            />
                        ) : (
                            props.head
                        )}
                    </h2>
                    <div className="card-menu-container">
                        {state === "edit" ? (
                            <div className="row">
                                <button type="submit" className="edit-check">
                                    <BiCheck size={24} />
                                </button>
                                <button type="reset" className="edit-reset">
                                    <BiX size={24} />
                                </button>
                            </div>
                        ) : (
                            <icons.Dotsmenu
                                onMouseDown={() =>
                                    setState((state) =>
                                        state === "menu" ? null : "menu"
                                    )
                                }
                            />
                        )}

                        <CardMenu
                            active={state === "menu"}
                            handleDelete={() => handleCardDelete(props.id)}
                            handleEditStart={() => setState("edit")}
                        />
                    </div>
                </div>
                <p>
                    {state === "edit" ? (
                        <textarea
                            maxLength={100}
                            name="para"
                            id="para"
                            defaultValue={props.para}
                        />
                    ) : (
                        props.para
                    )}
                </p>
            </form>
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
            <span onClick={props.handleEditStart}>
                <AiFillEdit size={24} />
            </span>
            <span onClick={props.handleDelete}>
                <AiFillDelete size={24} />
            </span>
        </div>
    );
}
