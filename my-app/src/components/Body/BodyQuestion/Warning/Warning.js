import React from "react";
import "./style-warning.scss";
function Warning({
  handleCloseWarning,
  handleWarningBoxSubmit,
  selectQuestion,
  dataQuestion,
  timerNow,
  formatTime,
}) {
  return (
    <>
      <div className="overlay" onClick={handleCloseWarning}></div>
      <div className="notify">
        <h1>
          Bạn còn {dataQuestion.length - selectQuestion.length} câu chưa trả lời
        </h1>
        <p>Thời gian còn {formatTime(timerNow)}</p>
        <p>Bạn đồng ý nộp bài chư ?</p>
        <div className="buttons">
          <button type="button" onClick={handleWarningBoxSubmit}>
            Nộp bài
          </button>
          <button type="button" onClick={handleCloseWarning}>
            Làm tiếp
          </button>
        </div>
      </div>
    </>
  );
}

export default Warning;
