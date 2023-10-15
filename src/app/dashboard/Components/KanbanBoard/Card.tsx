"use client";

import React, { CSSProperties } from "react";

import icons from "@/app/assets/icons";

import { ProgressBar, UsersCircle } from "../TopBoard/TopBoard";
import { v4 as uuid } from "uuid";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { calculateDaysDifference } from "./utils";
export type Card_T = {
    head: string;
    color: string;
    para: string;
    progress: number;
    created_date: Date;
    users: any[];
    id: string;
};

export default function Card(props: Card_T) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: props.id,
    });

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        ...(isDragging && { zIndex: 69 }),
    };

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
                <icons.Dotsmenu />
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
