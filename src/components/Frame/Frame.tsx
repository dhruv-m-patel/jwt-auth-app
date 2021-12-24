import React from "react";
import Center from "../Center";
import "./Frame.css";

interface FrameProps {
    title: string;
    children: React.ReactNode;
}

export default function Frame({ title, children }: FrameProps) {
    return (
        <div className="frame">
            <Center>
                <React.Fragment>
                    <h2>{title}</h2>
                </React.Fragment>
            </Center>
            <p />
            {children}
        </div>
    );
}
