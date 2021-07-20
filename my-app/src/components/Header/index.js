import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import Image from "../../common/Image";
import "./header-style.scss";
import { contextApp } from "../../App";
import MenuItem from "./MenuItem";

function Header() {
  const context = useContext(contextApp);
  let history = useHistory();
  const user = JSON.parse(localStorage.getItem("user-info"));

  const handleLogoutClick = () => {
    context.handleReset("logout");
    localStorage.removeItem("user-info");
    history.push("/login");
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
              <MenuItem text="thi thptqg" />
              <MenuItem text="đề thi kiểm tra" />
              <MenuItem text="english test" />
              <MenuItem text="it test" />
              <MenuItem text="đại học" />
              <MenuItem text="hướng nghiệp" />
              <MenuItem text="tài liệu" />
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
