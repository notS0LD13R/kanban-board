import React, { useState } from "react";
import "./DropMenu.scss";
import Link from "next/link";

export default function DropMenu({
    children,
    menuBody,
    onOpen,
    onClose,
}: {
    children: React.ReactNode;
    menuBody: {
        value: React.ReactNode | string;
        onClick?: () => void;
        link?: string;
    }[];
    onOpen?: () => void;
    onClose?: () => void;
}) {
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        if (open && onClose) onClose();
        else if (onOpen) onOpen();
        console.log("toggleing");

        setOpen(!open);
    };
    return (
        <div className="drop-menu">
            <div className="drop-head" onMouseDown={handleToggle}>
                {children}
            </div>
            <ul className={`drop-body ${open ? "active" : ""}`}>
                {menuBody.map((element) => (
                    <li key={Math.random()} onClick={element.onClick}>
                        {element.link ? (
                            <Link href={element.link}>{element.value}</Link>
                        ) : (
                            element.value
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
