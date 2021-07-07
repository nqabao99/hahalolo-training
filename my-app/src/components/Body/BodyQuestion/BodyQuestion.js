import React, { useState, useEffect, useContext, createContext } from "react";

import DetailQuestion from "./DetailQuestion";

import QuestionItems from "./QuestionItems";

import Button from "../../../common/Button/index";
import ResultModal from "./ResultModal/ResultModal";
import ControllerQuestion from "./ControlleQuestion/ControlleQuestion";
import Warning from "./Warning/Warning";

export const contextBodyQuestion = createContext();

function Index() {
  const [dataQuestion, setDataQuestion] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/question")
      .then((response) => response.json())
      .then((result) => setDataQuestion(result));
  }, []);

  const [selectQuestion, setSelectQuestion] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [count, setCount] = useState(0);
  const [stopTime, setStopTime] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerNow, setTimeNow] = useState(0);
  const [warning, setWarning] = useState(false);

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

    if (selectQuestion.length < 10) {
      setWarning(true);
    } else {
      setOpenModal(true);
      setStopTime(true);
    }
  };

  const handleWarningBoxSubmit = () => {
    setOpenModal(true);
    setStopTime(true);
    setWarning(false);
  };

  const handleCloseWarning = () => {
    setWarning(false);
  };

  const closeResultModalClick = () => {
    setOpenModal(false);
  };

  const prevQuestion = () => {
    if (count > 0) setCount((count) => count - 1);
  };

  const nextQuestion = () => {
    if (count < dataQuestion.length - 1) {
      setCount((count) => count + 1);
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

  const getTimeNow = (data) => {
    setTimeNow(data);
    if (data === 0) {
      setOpenModal(true);
      setStopTime(true);
      setWarning(false);
    }
  };

  let listContext = {
    dataQuestion: dataQuestion,
    selectQuestion: selectQuestion,
    count: count,
    formatTime: formatTime,
  };

  return (
    <div className="body-question">
      <DetailQuestion />

      <contextBodyQuestion.Provider value={listContext}>
        <div className="body-question__list">
          <form className="body-question__form" onSubmit={handleQuestionSubmit}>
            {dataQuestion.map(
              (item, index) =>
                index === count && (
                  <QuestionItems
                    handleGetAnswerChange={handleGetAnswerChange}
                    key={item.id}
                    itemQuestion={item}
                  />
                )
            )}

            <ControllerQuestion
              prevQuestion={prevQuestion}
              nextQuestion={nextQuestion}
              handleSelectQuestionClick={handleSelectQuestionClick}
              stopTime={stopTime}
              getTimerOclock={getTimerOclock}
              getTimeNow={getTimeNow}
            />

            <Button className="btn" type="submit" text="Nộp bài" />
          </form>

          {warning && (
            <Warning
              handleCloseWarning={handleCloseWarning}
              handleWarningBoxSubmit={handleWarningBoxSubmit}
              timerNow={timerNow}
            />
          )}

          {openModal && (
            <ResultModal
              closeResultModalClick={closeResultModalClick}
              timer={timer}
            />
          )}
        </div>
      </contextBodyQuestion.Provider>
    </div>
  );
}

export default Index;