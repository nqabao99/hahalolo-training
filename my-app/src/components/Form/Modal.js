import React from "react";
import "./login-style.scss";
import { Link } from "react-router-dom";

function Modal() {
  return (
    <div className="overlay">
      <div className="modal">
        <p>Đăng ký thành công!</p>
        <Link to="/login">
          <p>Đăng nhập</p>
        </Link>
      </div>
    </div>
  );
}

export default Modal;
