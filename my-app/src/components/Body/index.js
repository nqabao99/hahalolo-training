import React, { useState, useEffect } from "react";
import "./body-style.scss";
import QuestionItems from "./QuestionItems";
import RatingsTable from "./RatingsTable/index";
import Button from "../../common/Button/index";
import ResultModal from "./ResultModal/ResultModal";
import ListQuestion from "./ListQuestion/index";

function Index() {
  const [dataQuestion, setDataQuestion] = useState([]);
  const [selectQuestion, setSelectQuestion] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [count, setCount] = useState(0);
  const [openListQuestion, setOpenListQuestion] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/question")
      .then((response) => response.json())
      .then((result) => setDataQuestion(result));
  }, []);

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
    <main className="body">
      <div className="container">
        <div className="body-container">
          <div className="body-question">
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
            <div className="body-question__list">
              <form
                className="body-question__form"
                onSubmit={handleQuestionSubmit}
              >
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
                      <i
                        className="fa fa-caret-left"
                        onClick={prevQuestion}
                      ></i>
                      <i
                        className="fa fa-caret-right"
                        onClick={nextQuestion}
                      ></i>
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

          <RatingsTable />
        </div>
      </div>
    </main>
  );
}

export default Index;
