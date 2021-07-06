import React, { useState } from "react";

import DetailQuestion from "./DetailQuestion";

import QuestionItems from "./QuestionItems";

import Button from "../../../common/Button/index";
import ResultModal from "./ResultModal/ResultModal";
import ControllerQuestion from "./ControlleQuestion/ControlleQuestion";

function Index({ dataQuestion }) {
  const [selectQuestion, setSelectQuestion] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [count, setCount] = useState(0);
  const [stopTime, setStopTime] = useState(false);
  const [timer, setTimer] = useState(0);

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

    if (count < dataQuestion.length - 1) {
      setTimeout(() => {
        setCount(count + 1);
      }, 300);
    }
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    setOpenModal(true);
    setStopTime(true);
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

  const handleSelectQuestionClick = (index) => {
    setCount(index);
  };

  const formatTime = (sec) => {
    var hours = Math.floor(sec / 3600);
    hours >= 1 ? (sec = sec - hours * 3600) : (hours = "00");
    var min = Math.floor(sec / 60);
    min >= 1 ? (sec = sec - min * 60) : (min = "00");
    sec < 1 ? (sec = "00") : void 0;
    min.toString().length === 1 ? (min = "0" + min) : void 0;
    sec.toString().length === 1 ? (sec = "0" + sec) : void 0;
    return hours + ":" + min + ":" + sec;
  };

  const getTimerOclock = (data) => {
    setTimer(data);
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

          <ControllerQuestion
            prevQuestion={prevQuestion}
            nextQuestion={nextQuestion}
            dataQuestion={dataQuestion}
            selectQuestion={selectQuestion}
            handleSelectQuestionClick={handleSelectQuestionClick}
            count={count}
            stopTime={stopTime}
            formatTime={formatTime}
            getTimerOclock={getTimerOclock}
          />

          <Button type="submit" text="Nộp bài" />
        </form>

        {openModal && (
          <ResultModal
            closeResultModalClick={closeResultModalClick}
            selectQuestion={selectQuestion}
            dataQuestion={dataQuestion}
            timer={timer}
          />
        )}
      </div>
    </div>
  );
}

export default Index;
