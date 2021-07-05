import React from "react";
import "./footer-style.scss";
import Image from "../../common/Image";
import logoFooter from "../../assets/img/logof.png";
import FootetMainItems from "./FootetMainItems";

function index(props) {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <Image src={logoFooter} width="319" />
                </div>
                <div className="footer-main">
                    <div className="footer-main__list">
                        <FootetMainItems />
                        <FootetMainItems />
                        <FootetMainItems />
                        <FootetMainItems />
                        <FootetMainItems />
                        <FootetMainItems />
                    </div>
                </div>
                <div className="footer-bot">
                    <p>Copyright © 2020 by Tracnghiem.net</p>
                </div>
            </div>
        </footer>
    );
}

export default index;
