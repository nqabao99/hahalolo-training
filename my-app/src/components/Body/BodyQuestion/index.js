import React, { useState } from "react";

import DetailQuestion from "./DetailQuestion";

import QuestionItems from "./QuestionItems";

import Button from "../../../common/Button/index";
import ResultModal from "./ResultModal/ResultModal";
import ListQuestion from "./ListQuestion/index";

function Index({ dataQuestion }) {
  const [selectQuestion, setSelectQuestion] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [count, setCount] = useState(0);
  const [openListQuestion, setOpenListQuestion] = useState(false);

  const handleGetAnswerChange = (data) => {
    if (selectQuestion.length > 0) {
      const index = selectQuestion.findIndex(
        (item) => item.parent_id === data.parent_id
      );
      if (index >= 0) {
        selectQuestion[index] = data;
        setSelectQuestion([...selectQuestion]);
      } else {
        setSelectQuestion([...selectQuestion, data]);
      }
    } else {
      setSelectQuestion([...selectQuestion, data]);
    }
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const closeResultModalClick = () => {
    setOpenModal(false);
  };

  const prevQuestion = () => {
    if (count > 0) setCount(count - 1);
  };

  const nextQuestion = () => {
    if (count < dataQuestion.length - 1) {
      setCount(count + 1);
    }
  };

  const handleListQuestionClick = () => {
    setOpenListQuestion(!openListQuestion);
  };

  const handleSelectQuestionClick = (index) => {
    setCount(index);
  };

  return (
    <div className="body-question">
      <DetailQuestion />

      <div className="body-question__list">
        <form className="body-question__form" onSubmit={handleQuestionSubmit}>
          {dataQuestion.map(
            (item, index) =>
              index === count && (
                <QuestionItems
                  selectQuestion={selectQuestion}
                  handleGetAnswerChange={handleGetAnswerChange}
                  key={item.id}
                  dataQuestion={item}
                />
              )
          )}

          <div className="controlle">
            <div className="controlle-question">
              <div>
                <p>20:00</p>
              </div>
              <div>
                <i className="fa fa-caret-left" onClick={prevQuestion}></i>
                <i className="fa fa-caret-right" onClick={nextQuestion}></i>
                <i
                  className="fa fa-ellipsis-h"
                  onClick={handleListQuestionClick}
                ></i>
              </div>
            </div>

            {openListQuestion && (
              <ListQuestion
                dataQuestion={dataQuestion}
                selectQuestion={selectQuestion}
                handleSelectQuestionClick={handleSelectQuestionClick}
              />
            )}
          </div>
          <Button text="Nộp bài" />
        </form>

        {openModal && (
          <ResultModal
            closeResultModalClick={closeResultModalClick}
            selectQuestion={selectQuestion}
            dataQuestion={dataQuestion}
          />
        )}
      </div>
    </div>
  );
}

export default Index;
