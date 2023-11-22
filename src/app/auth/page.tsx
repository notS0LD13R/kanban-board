"use client";
import {
    CSSProperties,
    useRef,
    useState,
    MouseEvent,
    useLayoutEffect,
} from "react";
import OutlineText from "./Components/OutlineText/OutlineText";
import Card from "./Components/Card/Card";
import "./page.scss";
import { verify } from "./services/api";
import { useRouter } from "next/navigation";

export default function Auth() {
    const router = useRouter();
    useLayoutEffect(() => {
        (async () => {
            if (await verify()) router.push("/dashboard");
        })();
    }, []);

    const text = "KANBAN BOARD";
    const spacing: CSSProperties = { letterSpacing: "5vw", fontSize: "4vw" };
    const [offset, setOffset] = useState({
        "--offsetX": "0%",
        "--offsetY": "0%",
    });
    const [currCard, setCurrCard] = useState<"login" | "register">("login");
    const ref = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (ref) {
            setOffset({
                "--offsetX": `${(
                    (10 * e.clientX) / ref.current!.clientWidth -
                    5
                ).toFixed(2)}%`,
                "--offsetY": `${(
                    (10 * e.clientY) / ref.current!.clientHeight -
                    5
                ).toFixed(2)}%`,
            });
        }
    };
    return (
        <main className="auth" ref={ref} onMouseMove={handleMouseMove}>
            <div className="bg-text">
                <OutlineText text={text} style={spacing} offset={offset} />
                <OutlineText text={text} style={spacing} offset={offset} />
            </div>
            <div className=" card-stack">
                <Card
                    isRegister={false}
                    handleSwitch={() => setCurrCard("register")}
                    className={currCard == "login" ? "front" : "back"}
                />
                {/* Register */}
                <Card
                    isRegister={true}
                    handleSwitch={() => setCurrCard("login")}
                    className={currCard === "register" ? "front" : "back"}
                />
            </div>
        </main>
    );
}
