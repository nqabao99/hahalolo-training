import React, { useContext } from "react";
import "./style-warning.scss";
import Button from "../../../../common/Button/index";
import { contextBodyQuestion } from "../BodyQuestion";
function Warning({ handleCloseWarning, handleWarningBoxSubmit, timerNow }) {
  const context = useContext(contextBodyQuestion);
  return (
    <>
      <div className="overlay" onClick={handleCloseWarning}></div>
      <div className="notify">
        <h1>
          Bạn còn {context.dataQuestion.length - context.selectQuestion.length}{" "}
          câu chưa trả lời
        </h1>
        <p>Thời gian còn {context.formatTime(timerNow)}</p>
        <p>Bạn đồng ý nộp bài chư ?</p>
        <div className="buttons">
          <Button
            type="button"
            onClick={handleWarningBoxSubmit}
            text="Nộp bài"
          ></Button>
          <Button
            type="button"
            onClick={handleCloseWarning}
            text="Làm tiếp"
          ></Button>
        </div>
      </div>
    </>
  );
}

export default Warning;
