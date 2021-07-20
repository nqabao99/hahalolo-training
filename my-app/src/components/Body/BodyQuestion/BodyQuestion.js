import React, { useState, useEffect, createContext, useContext } from "react";
import DetailQuestion from "./DetailQuestion";
import QuestionItems from "./QuestionItems";

import ControllerQuestion from "./ControlleQuestion/ControlleQuestion";
import Spinner from "./Loading/Loading";
import { contextApp } from "../../../App";


import DialogWarning from "./DialogWarning";
import DialogResult from "./DialogResult";

import {useAxios} from "../../../hooks/useAxios";
import axios from "axios";

export const contextBodyQuestion = createContext();

function Index({ handleEndClick }) {
  const contextapp = useContext(contextApp);
  // const [dataQuestion, setDataQuestion] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // const sleep = (ms) => {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // };

  const { response: dataQuestion, loading : isLoading } = useAxios({
    method: 'get',
    url: 'http://localhost:3000/question'
});


  const [selectQuestion, setSelectQuestion] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [count, setCount] = useState(0);
  const [flagStopTime, setFlagStopTime] = useState(false);
  const [timeOut, setTimeOut] = useState(0);
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
        setCount(count => count  + 1);
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
    fetchQuestion();
    setOpenModal(false);
  };

  const fetchQuestion = async () => {
    let ramdomID = Math.random().toString(36).substring(7);
    const user = JSON.parse(localStorage.getItem("user-info"));
    let data = {
      id: ramdomID,
      id_user: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      timeOut: timeOut,
      scores: result.scores,
    };

    let check = contextapp.listResult.find((item) => item.id_user === user.id);

    async function updateListResult() {
      let data1 = {
        scores: data.scores,
          timeOut: data.timeOut
      }
      axios.patch(`http://localhost:3000/listResult/${check.id}`, data1)
    }

    if (check) {
      if (data.scores > check.scores) {
        updateListResult();
      } else {
        if (data.scores === check.scores) {
          if (data.timeOut > check.timeOut) {
            updateListResult();
          }
        }
      }
    } else {
      axios.post("http://localhost:3000/listResult",data)
    }

    contextapp.handleListResult(ramdomID);
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

  let listContext = {
    dataQuestion: dataQuestion,
    selectQuestion: selectQuestion,
    count: count,
    formatTime: formatTime,
    getTimeOut: getTimeOut,
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

              {/* <Button
                variant="contained"
                style={{padding: "10px 50px"}}
                className={clsx(classes.button, classes.mt)}
                type="submit"
              >
                Nộp bài
              </Button> */}
            </form>

            <DialogWarning
              handleCloseWarning={handleCloseWarning}
              handleWarningBoxSubmit={handleWarningBoxSubmit}
              warning={warning}
            />

            {openModal && (
              <DialogResult openModal={openModal} closeResultModalClick={closeResultModalClick} />
            )}
          </div>
        </contextBodyQuestion.Provider>
      </div>
    );
  }
}

export default Index;
