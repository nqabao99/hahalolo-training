import React from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import Image from "../../common/Image";
import "./header-style.scss";

function Header({ triggerGetAccount }) {
  let history = useHistory();
  const user = JSON.parse(localStorage.getItem("user-info"));

  const handleLogoutClick = () => {
    triggerGetAccount();
    history.push("/login");
    localStorage.removeItem("user-info");
  };

  return (
    <header>
      <div className="container">
        <div className="header">
          <div className="header-logo">
            <Link to="/">
              <Image src={logo} alt="ảnh logo" />
            </Link>
          </div>
          <div className="header-navmenu">
            <ul className="header-navmenu__list">
              <li className="header-navmenu__items">
                <a href="#/">thi thptqg</a>
              </li>
              <li className="header-navmenu__items">
                <a href="#/">đề thi kiểm tra</a>
              </li>
              <li className="header-navmenu__items">
                <a href="#/">english test</a>
              </li>
              <li className="header-navmenu__items">
                <a href="#/">it test</a>
              </li>
              <li className="header-navmenu__items">
                <a href="#/">đại học</a>
              </li>
              <li className="header-navmenu__items">
                <a href="#/"> hương nghiệp</a>
              </li>
              <li className="header-navmenu__items">
                <a href="#/">tài liệu</a>
              </li>
            </ul>
          </div>
          <div className="header-login">
            <Link to={user ? "" : "/login"}>
              <span>{user ? user.lastName : "Đăng nhập"}</span>
              <i className="fa fa-user-circle"></i>
            </Link>
            {user && (
              <div className="logout" onClick={handleLogoutClick}>
                <p>Đăng xuất</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
