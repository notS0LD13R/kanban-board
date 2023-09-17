"use client";

import React, { useState } from "react";
import { IconType } from "react-icons/lib/esm/iconBase";

import "./SideNav.scss";

import icons from "../../assets/icons";

type link_T = {
    label: string;
    icon: IconType;
    notification?: { label: string; color: string };
};

export default function SideNav() {
    const links: link_T[] = [
        {
            label: "Dashboard",
            icon: icons.Meter,
        },
        {
            label: "Email",
            icon: icons.Mail,
            notification: {
                label: "11",
                color: "#5ECFFF",
            },
        },
        {
            label: "Chat",
            icon: icons.Chat,
        },
        {
            label: "Kanban",
            icon: icons.Grid,
        },
        {
            label: "Contact",
            icon: icons.Contact,
            notification: {
                label: "New",
                color: "#E328AF",
            },
        },
        {
            label: "Dashboard",
            icon: icons.Meter,
        },
        {
            label: "Calendar",
            icon: icons.Calendar,
        },
        {
            label: "Courses",
            icon: icons.Course,
        },
        {
            label: "Shop",
            icon: icons.Shop,
        },
        {
            label: "Invoices",
            icon: icons.Invoice,
        },
        {
            label: "Settings",
            icon: icons.Settings,
        },
    ];

    const [active, setActive] = useState(true);

    return (
        <nav className={`side-nav ${active ? "active" : ""}`}>
            <div className="nav-head">
                <span>weframetech</span>
                <icons.Menu onClick={() => setActive(!active)} />
            </div>
            <ul>
                <span className="list-head">MAIN MENU</span>
                {links.map((link, index) => (
                    <li key={`link${index}`}>
                        <link.icon />
                        <span>{link.label}</span>
                        {link.notification && (
                            <span
                                className="notification"
                                style={{
                                    backgroundColor: link.notification.color,
                                }}
                            >
                                {link.notification.label}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
