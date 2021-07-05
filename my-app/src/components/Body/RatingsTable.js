import React from "react";

import RatingsTableItems from "./RatingsTableItems";
import Button from "../../common/Button/index";

function RatingsTable() {
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
                    <RatingsTableItems
                        name="Hiệu Hải Đăng"
                        scores="7"
                        time="19:30"
                    />
                    <RatingsTableItems
                        name="Hiệu Hải Đăng"
                        scores="7"
                        time="19:30"
                    />
                    <RatingsTableItems
                        name="Hiệu Hải Đăng"
                        scores="7"
                        time="19:30"
                    />
                </div>
                <Button className="body-ratings__btn" text="Nộp bài" />
            </div>
        </div>
    );
}

export default RatingsTable;
