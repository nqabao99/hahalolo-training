import React, { createContext, useEffect, useState } from "react";
import ControllerQuestion from "./ControlleQuestion/ControlleQuestion";
import DetailQuestion from "./DetailQuestion";
import DialogResult from "./DialogResult";
import DialogWarning from "./DialogWarning";
import Spinner from "./Loading/Loading";
import QuestionItems from "./QuestionItems";

export const contextBodyQuestion = createContext();

function BodyQuestion(props) {
  const {
    handleEndClick,
    triggerUpdateListResult,
    listResult,
    triggerAddResult,
    triggerGetListQuestion,
    listQuestion,
    StatusFlags,
    selectQuestion,
    addSelectQuestion,
    reSetSelectQuestion,
    stopTime,
    resetStopTime,
    timeOut,
  } = props;

  useEffect(() => {
    triggerGetListQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [warning, setWarning] = useState(false);

  const [result, setResult] = useState();

  const handleGetAnswerChange = (data) => {
    addSelectQuestion(data);

    if (count < listQuestion.length - 1) {
      setTimeout(() => {
        setCount((count) => count + 1);
      }, 300);
    }
  };

  function getResult() {
    let result;
    let sumQuestion = listQuestion.length;
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
      stopTime();
      getResult();
    }
  };

  const handleWarningBoxSubmit = () => {
    setOpenModal(true);
    stopTime();
    setWarning(false);
    getResult();
  };

  const handleCloseWarning = () => {
    setWarning(false);
  };

  //Xong
  const closeResultModalClick = () => {
    setOpenModal(false);
    handleEndClick(true);
    updateListResult();
    setOpenModal(false);
    reSetSelectQuestion([]);
    resetStopTime();
  };

  const updateListResult = async () => {
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

    let check = listResult.find((item) => item.id_user === user.id);

    function updateListResult() {
      let data1 = {
        scores: data.scores,
        timeOut: data.timeOut,
      };

      triggerUpdateListResult(check.id, data1);
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
      triggerAddResult(data);
    }
  };

  const prevQuestion = () => {
    if (count > 0) setCount((count) => count - 1);
  };

  const nextQuestion = () => {
    if (count < listQuestion.length - 1) {
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

  let listContext = {
    formatTime: formatTime,
    result: result,
  };

  if (StatusFlags.isLoading) {
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
              {listQuestion.map(
                (item, index) =>
                  index === count && (
                    <QuestionItems
                      handleGetAnswerChange={handleGetAnswerChange}
                      key={item.id}
                      itemQuestion={item}
                      selectQuestion={selectQuestion}
                    />
                  )
              )}

              <ControllerQuestion
                prevQuestion={prevQuestion}
                nextQuestion={nextQuestion}
                handleSelectQuestionClick={handleSelectQuestionClick}
                listQuestion={listQuestion}
                selectQuestion={selectQuestion}
                count={count}
              />
            </form>

            <DialogWarning
              handleCloseWarning={handleCloseWarning}
              handleWarningBoxSubmit={handleWarningBoxSubmit}
              listQuestion={listQuestion}
              warning={warning}
              selectQuestion={selectQuestion}
            />

            {openModal && (
              <DialogResult
                openModal={openModal}
                closeResultModalClick={closeResultModalClick}
                listQuestion={listQuestion}
                selectQuestion={selectQuestion}
                timeOut={timeOut}
              />
            )}
          </div>
        </contextBodyQuestion.Provider>
      </div>
    );
  }
}

export default BodyQuestion;
