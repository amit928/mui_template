import React from "react";
import './panda_loader.css';

export default function PandaLoader() {
    return <div style={{ display: "flex", justifyContent: "center", transform:"scale(0.9)" }}>
        <span className="panda_loader"></span>
    </div>;
}
