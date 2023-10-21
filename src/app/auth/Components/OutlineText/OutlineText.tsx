import { CSSProperties } from "react";

import "./OutlineText.scss";

type props_T = {
    text: string;
    style?: CSSProperties;
    offset: {
        "--offsetX": string;
        "--offsetY": string;
    };
};

export default function OutlineText({ text, style, offset }: props_T) {
    //@ts-ignore
    style = { ...offset, ...style };

    return (
        <div className="outline-text" style={style}>
            <span>&nbsp;{text}</span>
            <span className="floating">&nbsp;{text}</span>
        </div>
    );
}
