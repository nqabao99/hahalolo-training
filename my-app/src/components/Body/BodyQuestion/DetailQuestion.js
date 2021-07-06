import React from "react";

function DetailQuestion() {
  return (
    <>
      <h2 className="name">Đề thi thử THPT QG năm 2021</h2>
      <p className="content">Trường THPT Chuyên Bắc Ninh lần 3</p>
      <div className="body-question__detail">
        <div className="detail-items">
          <i className="fa fa-check-square"></i>
          <span>10 câu</span>
        </div>
        <div className="detail-items">
          <i className="fa fa-history"></i>
          <span>30 phút</span>
        </div>
        <div className="detail-items">
          <i className="fa fa-user"></i>
          <span>82 lượt thi</span>
        </div>
      </div>
    </>
  );
}

export default DetailQuestion;
