import React from "react";
import "./style-button.scss";

function index({ className, text, type, onClick }) {
  return (
    <button onClick={onClick} type={type} className={`btn ${className}`}>
      {text}
    </button>
  );
}

export default index;
