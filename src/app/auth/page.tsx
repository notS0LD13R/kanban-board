"use client";
import { CSSProperties, useMemo, useRef, useState, MouseEvent } from "react";
import OutlineText from "./Components/OutlineText/OutlineText";
import "./page.scss";

export default function Auth() {
    const text = "KANBAN BOARD";
    const spacing: CSSProperties = { letterSpacing: "5vw", fontSize: "4vw" };
    const [offset, setOffset] = useState({
        "--offsetX": "0%",
        "--offsetY": "0%",
    });
    const ref = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (ref) {
            setOffset({
                "--offsetX": `${(
                    (15 * e.clientX) / ref.current!.clientWidth -
                    7.5
                ).toFixed(2)}%`,
                "--offsetY": `${(
                    (15 * e.clientY) / ref.current!.clientHeight -
                    7.5
                ).toFixed(2)}%`,
            });
        }
    };
    console.log(offset);
    return (
        <main className="auth" ref={ref} onMouseMove={handleMouseMove}>
            <OutlineText text={text} style={spacing} offset={offset} />
            <OutlineText text={text} style={spacing} offset={offset} />
        </main>
    );
}
