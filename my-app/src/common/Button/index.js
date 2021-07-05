import React from "react";
import "./style-button.scss";

function index({ className, text }) {
    return <button className={className}>{text}</button>;
}

export default index;
