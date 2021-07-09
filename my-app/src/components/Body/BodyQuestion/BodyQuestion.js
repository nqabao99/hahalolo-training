import React, { useState, useEffect, createContext } from "react";

import DetailQuestion from "./DetailQuestion";

import QuestionItems from "./QuestionItems";

import Button from "../../../common/Button/index";
import ResultModal from "./ResultModal/ResultModal";
import ControllerQuestion from "./ControlleQuestion/ControlleQuestion";
import Warning from "./Warning/Warning";

import Spinner from "./Loading/Loading";

export const contextBodyQuestion = createContext();

function Index({ handleEndClick }) {
  const [dataQuestion, setDataQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      setIsLoading(true);
      await sleep(1500);
      const responseJson = await fetch("http://localhost:3000/question");
      const response = await responseJson.json();
      setDataQuestion(response);
      setIsLoading(false);
    };
    fetchQuestion();
  }, []);

  const [selectQuestion, setSelectQuestion] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [count, setCount] = useState(0);
  const [flagStopTime, setFlagStopTime] = useState(false);
  const [timeOut, setTimeOut] = useState(0);
  const [timerNow, setTimeNow] = useState(0);
  const [warning, setWarning] = useState(false);
  const [result, setResult] = useState();

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

  function getResult() {
    let result;
    let sumQuestion = dataQuestion.length;
    let countQuestionCorrect = 0;
    let countQuestionWrong = 0;
    selectQuestion.map((i) =>
      i.result ? countQuestionCorrect++ : countQuestionWrong++
    );
    let scores =
      Math.round(countQuestionCorrect * (10 / sumQuestion) * 100) / 100;

    result = {
      scores: scores,
      countQuestionCorrect: countQuestionCorrect,
      countQuestionWrong: countQuestionWrong,
    };
    setResult(result);
  }

  const handleQuestionSubmit = (e) => {
    e.preventDefault();

    if (selectQuestion.length < 10) {
      setWarning(true);
    } else {
      setOpenModal(true);
      setFlagStopTime(true);

      getResult();
    }
  };

  const handleWarningBoxSubmit = () => {
    setOpenModal(true);
    setFlagStopTime(true);
    setWarning(false);

    getResult();
  };

  const handleCloseWarning = () => {
    setWarning(false);
  };

  const closeResultModalClick = () => {
    setOpenModal(false);
    handleEndClick(true);
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

  const getTimeOut = (data) => {
    setTimeOut(data);
  };

  const getTimeNow = (data) => {
    setTimeNow(data);
    if (data === 0) {
      setOpenModal(true);
      setFlagStopTime(true);
      setWarning(false);
      getResult();
    }
  };

  let listContext = {
    dataQuestion: dataQuestion,
    selectQuestion: selectQuestion,
    count: count,
    formatTime: formatTime,
    getTimeOut: getTimeOut,
    getTimeNow: getTimeNow,
    timeOut: timeOut,
    flagStopTime: flagStopTime,
    result: result,
  };

  if (isLoading) {
    return (
      <div className="body-question">
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className="body-question">
        <DetailQuestion />

        <contextBodyQuestion.Provider value={listContext}>
          <div className="body-question__list">
            <form
              className="body-question__form"
              onSubmit={handleQuestionSubmit}
            >
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
              <ResultModal closeResultModalClick={closeResultModalClick} />
            )}
          </div>
        </contextBodyQuestion.Provider>
      </div>
    );
  }
}

export default Index;
