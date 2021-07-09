import React, { useContext } from "react";
import "./result-modal.scss";
import { contextBodyQuestion } from "../BodyQuestion";

function ResultModal({ closeResultModalClick }) {
  const context = useContext(contextBodyQuestion);
  const arrd = [];
  const arrs = [];
  context.selectQuestion.map((i) => (i.result ? arrd.push(i) : arrs.push(i)));
  const scores =
    Math.round(arrd.length * (10 / context.dataQuestion.length) * 100) / 100;

  return (
    <>
      <div className="modal">
        <div className="overlay"></div>
        <div className="modal-result">
          <h1 className="modal-header">KẾT QUẢ</h1>
          <div className="modal-body">
            <div className="modal-body__title">
              <p>Thời gian: {context.formatTime(600 - context.timeOut)}</p>
              <p>Điểm số: {scores}</p>
              <p>Số câu đúng: {arrd.length}</p>
              <p>Số câu Sai: {arrs.length}</p>
            </div>
            <div className="modal-body__table">
              <h2>Đáp án của bạn</h2>
              <div className="modal-body__table-result">
                {context.selectQuestion.map((item) => (
                  <span key={item.answer_id}>
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
