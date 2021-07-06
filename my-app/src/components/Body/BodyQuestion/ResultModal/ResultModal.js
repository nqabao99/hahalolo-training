import React from "react";
import "./result-modal.scss";

function ResultModal({ closeResultModalClick, selectQuestion, dataQuestion }) {
  const arrd = [];
  const arrs = [];
  selectQuestion.map((i) => (i.result ? arrd.push(i) : arrs.push(i)));

  return (
    <>
      <div className="modal">
        <div className="overlay" onClick={closeResultModalClick}></div>
        <div className="modal-result">
          <h1 className="modal-header">KẾT QUẢ</h1>
          <div className="modal-body">
            <div className="modal-body__title">
              {/* <p>Thời gian: {seconds_to(600 - timer)}</p> */}
              <p>Số câu đúng: {arrd.length}</p>
              <p>Số câu Sai: {arrs.length}</p>
            </div>
            <div className="modal-body__table">
              <h2>Đáp án của bạn</h2>
              <div className="modal-body__table-result">
                {selectQuestion.map((item) => (
                  <span key={item.answer_id}>
                    {`${item.parent_id.slice(-1)} - 
                    ${item.content_answer.slice(0, 1)}`}
                  </span>
                ))}
              </div>
            </div>
            <div className="modal-body__table">
              <h2>Đáp án đúng</h2>
              <div className="modal-body__table-result">
                {dataQuestion.map((item) => (
                  <span key={item.id}>
                    {item.answers.map((i) =>
                      i.result
                        ? `${i.parent_id.slice(-1)} - 
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