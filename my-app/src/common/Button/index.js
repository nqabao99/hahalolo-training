import React from "react";
import "./style-button.scss";

function index({ className, text, type, onClick, disabled, icon }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={className}
    >
      {text}
      {icon && <i className={icon}></i>}
    </button>
  );
}

export default index;
