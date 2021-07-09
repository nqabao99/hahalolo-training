import React from "react";

function RatingsTableItems({ name, scores, time }) {
  return (
    <div className="table-items">
      <p>{name}</p>
      <p>{scores} đ</p>
      <p>{time}</p>
    </div>
  );
}

export default RatingsTableItems;
