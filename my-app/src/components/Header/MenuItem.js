import React from "react";

function MenuItem({ text }) {
  return (
    <li className="header-navmenu__items">
      <a href="#/">{text}</a>
    </li>
  );
}

export default MenuItem;
