import React from "react";
import "./Center.css";

interface CenterProps {
    children: React.ReactNode;
}

export default function Center({ children }: CenterProps): JSX.Element {
    return <div className="center">{children}</div>;
}
