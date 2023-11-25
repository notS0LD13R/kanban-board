"use client";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import Select from "react-select";
import { IconType } from "react-icons";

import "./TopNav.scss";

import icons from "@/app/assets/icons";
import { flags, profile } from "@/app/assets";
import DropMenu from "@/Components/DropMenu/DropMenu";

type icon_T = {
    icon: IconType;
};

type language_T = {
    lang: string;
    flag: StaticImageData;
};

export default function TopNav() {
    const handleLogout = () => {
        console.log("logout");
    };

    const profileBody = [
        {
            value: "Profile",
            link: "/profile",
        },
        {
            value: "Logout",
            onClick: handleLogout,
        },
    ];

    return (
        <nav className="top-nav">
            <SearchBar />
            <Link href="#">OTHER MENUS</Link>
            <IconGroup />
            <LanguageSelector />
            <DropMenu menuBody={profileBody}>
                <Profile />
            </DropMenu>
        </nav>
    );
}

function SearchBar() {
    const [search, setSearch] = useState("");

    const handleChange = (e: any) => {
        setSearch(e.target.value);
    };
    return (
        <div className="search-bar">
            <icons.Search />
            <input
                type="text"
                value={search}
                onChange={handleChange}
                placeholder="Search here"
            />
        </div>
    );
}

function IconGroup() {
    //using object instead of directly storing for future use
    // might have to include links
    const iconList: icon_T[] = [
        {
            icon: icons.Bell,
        },
        {
            icon: icons.Course,
        },
        {
            icon: icons.Checkbox,
        },
        {
            icon: icons.Folder,
        },
    ];

    const [notificationCount, setNotificationCount] = useState(
        new Array(iconList.length).fill(0)
    );
    return (
        <div className="icon-group">
            {iconList.map((icon, index) => (
                <span
                    key={`ic${index}`}
                    style={
                        {
                            //Pretty cool way of updating content in before pseudo ele
                            "--msg-count": `"${notificationCount[index]}"`,
                        } as any
                    }
                    //No real use just for checking
                    onClick={() => {
                        const temp = [...notificationCount];
                        temp[index] += 1;
                        setNotificationCount(temp);
                    }}
                >
                    <icon.icon />
                </span>
            ))}
        </div>
    );
}

function LanguageSelector() {
    const options: language_T[] = [
        {
            lang: "ENGLISH",
            flag: flags.USA,
        },
        {
            lang: "HINDI",
            flag: flags.India,
        },
        {
            lang: "FRENCH",
            flag: flags.India,
        },
    ];

    const [selected, setSelected] = useState<language_T>({
        lang: "ENGLISH",
        flag: flags.USA,
    });
    const [active, setActive] = useState(false);

    return (
        <div className="lang-select">
            <div className="curr-option" onClick={() => setActive(!active)}>
                <Image src={selected.flag} alt="" />
                <span>{selected.lang}</span>
                <icons.Dropdown />
            </div>
            <div className={"lang-list" + (active ? " active" : "")}>
                {options.map((option) => {
                    return (
                        <div
                            className="lang-option"
                            key={option.lang}
                            onClick={() => {
                                setSelected(option);
                                setActive(false);
                            }}
                        >
                            <Image src={option.flag} alt="" />
                            <span>{option.lang}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function Profile() {
    const username = "Instructor Day";
    const role = "Super Admin";

    return (
        <div className="profile">
            <Image src={profile.profileDP} alt="" />
            <div>
                <span>{username}</span>
                <span>{role}</span>
            </div>
            <icons.Dropdown />
        </div>
    );
}
