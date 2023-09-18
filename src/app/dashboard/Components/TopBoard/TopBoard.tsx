"use client";

import Image from "next/image";
import React, { useState } from "react";

import "./TopBoard.scss";
import icons from "@/app/assets/icons";
import { topBoard as images } from "@/app/assets";

export default function TopBoard() {
    const [msgCount, setMsgCount] = useState(0);
    const [progress, setProgress] = useState(60);

    return (
        <div className="top-board">
            <div className="row">
                <div className="left">
                    <icons.Leftarrow />
                    <div className="col">
                        <h2>School November Tasks</h2>
                        <p>Created by Instructor Day on November 31, 2022</p>
                    </div>
                </div>
                <div className="right">
                    <div className="col">
                        <h2>Centered Martial Arts</h2>
                        <p>Sunnyvale, Ca</p>
                    </div>
                    <Image src={images.circle} alt="" />
                </div>
            </div>
            <div className="row">
                <div className="left">
                    <UsersCircle />
                    <button>
                        {" "}
                        <icons.Useradd /> Invite People
                    </button>
                    <button>Private</button>
                    <button>Edit</button>
                    <button>
                        {" "}
                        <icons.Comments /> {msgCount} Comments{" "}
                    </button>
                </div>
                <div className="right">
                    Total Progress {progress}%
                    <div className="bar-container">
                        <ProgressBar
                            color="var(--Primary)"
                            progress={progress}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function UsersCircle() {
    //could house user profile pic later on
    const users = [{}, {}, {}, {}, {}, {}, {}];

    return (
        <div className="users-circle">
            {users.slice(0, 4).map((user, index) => (
                <div className="circle" key={`circle${index}`}></div>
            ))}
            {users.length > 4 && (
                <div className="circle">{users.length - 4}+</div>
            )}
        </div>
    );
}

export function ProgressBar(props: { color: string; progress: number }) {
    return (
        <div
            className="progress-bar"
            style={{
                width: `${props.progress}%`,
                backgroundColor: `${props.color}`,
            }}
        ></div>
    );
}
