import React, { useContext } from "react";
import { contextBodyQuestion } from "../BodyQuestion";
import "./result-modal.scss";

function ResultModal({ closeResultModalClick }) {
  const context = useContext(contextBodyQuestion);

  return (
    <>
      <div className="modal">
        <div className="overlay"></div>
        <div className="modal-result">
          <h1 className="modal-header">KẾT QUẢ</h1>
          <div className="modal-body">
            <div className="modal-body__title">
              <p>Thời gian: {context.formatTime(600 - context.timeOut)}</p>
              <p>Điểm số: {context.result.scores}</p>
              <p>Số câu đúng: {context.result.countQuestionCorrect}</p>
              <p>Số câu Sai: {context.result.countQuestionWrong}</p>
            </div>
            <div className="modal-body__table">
              <h2>Đáp án của bạn</h2>
              <div className="modal-body__table-result">
                {context.selectQuestion.map((item) => (
                  <span
                    key={item.answer_id}
                    className={item.result ? "correct" : "wrong"}
                  >
                    {`${
                      item.parent_id.length > 10
                        ? item.parent_id.slice(-2)
                        : item.parent_id.slice(-1)
                    } - 
                  ${item.content_answer.slice(0, 1)}`}
                  </span>
                ))}
              </div>
            </div>
            <div className="modal-body__table">
              <h2>Đáp án đúng</h2>
              <div className="modal-body__table-result">
                {context.dataQuestion.map((item, index) => (
                  <span key={item.id}>
                    {item.answers.map((i) =>
                      i.result
                        ? `${index + 1} - 
                      ${i.content_answer.slice(0, 1)}`
                        : null
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a href="/#" onClick={closeResultModalClick}>
              <i className="fa fa-angle-left"></i> Quay lại
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResultModal;
