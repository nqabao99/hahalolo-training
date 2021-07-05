import React from "react";
import "./header-style.scss";

import Image from "../../common/Image";
import logo from "../../assets/img/logo.png";

function Header() {
    return (
        <header>
            <div className="container">
                <div className="header">
                    <div className="header-logo">
                        <a href="#/">
                            <Image src={logo} alt="ảnh logo" />
                        </a>
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
                        <a href="#/">
                            <span>Đăng nhập</span>
                            <i className="fa fa-user-circle"></i>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
