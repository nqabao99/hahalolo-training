import React, { useContext } from "react";

import RatingsTableItems from "./RatingsTableItems";
import Button from "../../../common/Button/index";
import "./style.scss";
import { contextApp } from "../../../App";
function RatingsTable() {
  const contextapp = useContext(contextApp);
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
              index < 3 && (
                <RatingsTableItems
                  key={item.id}
                  name={`${item.firstName} ${item.lastName}`}
                  scores={item.scores}
                  time={item.timeOut}
                />
              )
          )}

          {/* <RatingsTableItems name="Hiệu Hải Đăng" scores="7" time="19:30" />
          <RatingsTableItems name="Hiệu Hải Đăng" scores="7" time="19:30" /> */}
        </div>
        <Button className="btn body-ratings__btn" text="Nộp bài" />
      </div>
    </div>
  );
}

export default RatingsTable;
