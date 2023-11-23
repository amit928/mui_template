import { Dialog, Paper } from "@mui/material";
import React from "react";
import './loader1.css';
import { useSelector } from "react-redux";

export default function Loader({ open }) {
    const common_color = useSelector(store => store.common.common_color);

    const dynamicStyle = {
        '--dynamic-color': common_color.BACKGROUND_COLOR
    };

    return <React.Fragment>
        {open &&
            <div className="modal-overlay" >
                <div className="modal-content">
                    <span className="loader" style={dynamicStyle} ></span>
                </div>
            </div>}
    </React.Fragment>;
}
