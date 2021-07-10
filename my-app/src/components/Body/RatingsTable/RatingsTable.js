import React, { useContext, useState } from "react";

import RatingsTableItems from "./RatingsTableItems";
import Button from "../../../common/Button/index";
import "./style.scss";
import { contextApp } from "../../../App";

function RatingsTable() {

  const formatTime = (sec) => {
    var hours = Math.floor(sec / 3600);
    hours >= 1 ? (sec = sec - hours * 3600) : (hours = "00");
    var min = Math.floor(sec / 60);
    min >= 1 ? (sec = sec - min * 60) : (min = "00");
    sec < 1 ? (sec = "00") : void 0;
    min.toString().length === 1 ? (min = "0" + min) : void 0;
    sec.toString().length === 1 ? (sec = "0" + sec) : void 0;
    return hours + ":" + min + ":" + sec;
  };

  const contextapp = useContext(contextApp);

  const [number , setNumber] = useState(3);

  const handleNumberClick = ()=>{
    setNumber(10);
  }

  return (
    <div className="body-ratings">
      <div className="body-ratings__header">
        <h3>Top 10 lượt thi</h3>
      </div>
      <div className="body-ratings__main">
        <div className="body-ratings__table">
          <div className="table-items">
            <p>Tên</p>
            <p>Điểm</p>
            <p>Thời gian</p>
          </div>
          {contextapp.listResult.map(
            (item, index) =>
              index < number && (
                <RatingsTableItems
                  key={item.id}
                  name={`${item.firstName} ${item.lastName}`}
                  scores={item.scores}
                  time={formatTime(600 - item.timeOut).slice(-5) }
                />
              )
          )}

        </div>
        {number !== 10 && <Button onClick={handleNumberClick} className="btn body-ratings__btn" text="Xem thêm" />}
        
      </div>
    </div>
  );
}

export default RatingsTable;
