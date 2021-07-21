import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SetCountDown,
  SetCountIndex,
  SetCountUp,
  SetDataQuestion,
  SetFlagStopTime,
  SetLoading,
  SetOpenModalResult,
  SetOpenModalWarning,
  SetResult,
  SetSelectQuestion,
  SetSelectQuestionNull,
} from "../../../actions/Question";
import { contextApp } from "../../../App";
import ControllerQuestion from "./ControlleQuestion";
import DetailQuestion from "./DetailQuestion";
import DialogResult from "./DialogResult";
import DialogWarning from "./DialogWarning";
import Spinner from "./Loading/Loading";
import QuestionItems from "./QuestionItems";

function Index({ handleEndClick }) {
  const contextapp = useContext(contextApp);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      await sleep(1000);
      const responseJson = await fetch("http://localhost:3000/question");
      const response = await responseJson.json();
      dispatch(SetDataQuestion(response));
      dispatch(SetLoading(false));
    };
    fetchQuestion();
  }, []);

  const openModal = useSelector((state) => state.question.openModalResult);
  const warning = useSelector((state) => state.question.openModalWarning);
  const timeOut = useSelector((state) => state.question.timeOut);
  const result = useSelector((state) => state.question.result);
  const dataQuestion = useSelector((state) => state.question.dataQuestion);
  const count = useSelector((state) => state.question.count);
  const isLoading = useSelector((state) => state.question.loading);
  const selectQuestion = useSelector((state) => state.question.selectQuestion);
  const dispatch = useDispatch();

  const handleGetAnswerChange = (data) => {
    dispatch(SetSelectQuestion(data));

    setTimeout(() => {
      dispatch(SetCountUp(count));
    }, 300);
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
    dispatch(SetResult(result));
  }

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (selectQuestion.length < 10) {
      dispatch(SetOpenModalWarning(true));
    } else {
      dispatch(SetFlagStopTime(true));
      dispatch(SetOpenModalResult(true));
      getResult();
    }
  };

  const handleWarningBoxSubmit = () => {
    dispatch(SetFlagStopTime(true));
    dispatch(SetOpenModalResult(true));
    dispatch(SetOpenModalWarning(false));
    getResult();
  };

  const handleCloseWarning = () => {
    dispatch(SetOpenModalWarning(false));
  };

  //Xong
  const closeResultModalClick = () => {
    dispatch(SetFlagStopTime(false));
    dispatch(SetOpenModalResult(false));
    dispatch(SetResult(null));
    dispatch(SetLoading(true));
    dispatch(SetCountIndex(0));
    dispatch(SetSelectQuestionNull([]));
    handleEndClick(true);
    fetchQuestion();
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
        timeOut: data.timeOut,
      };
      axios.patch(`http://localhost:3000/listResult/${check.id}`, data1);
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
      axios.post("http://localhost:3000/listResult", data);
    }

    contextapp.handleListResult(ramdomID);
  };

  const prevQuestion = () => {
    dispatch(SetCountDown(count));
  };

  const nextQuestion = () => {
    dispatch(SetCountUp(count));
  };

  const handleSelectQuestionClick = (index) => {
    dispatch(SetCountIndex(index));
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

        <div className="body-question__list">
          <form className="body-question__form" onSubmit={handleQuestionSubmit}>
            {dataQuestion.map(
              (item, index) =>
                index === count && (
                  <QuestionItems
                    handleGetAnswerChange={handleGetAnswerChange}
                    key={`body${item.id}`}
                    itemQuestion={item}
                  />
                )
            )}

            <ControllerQuestion
              prevQuestion={prevQuestion}
              nextQuestion={nextQuestion}
              handleSelectQuestionClick={handleSelectQuestionClick}
            />
          </form>

          <DialogWarning
            handleCloseWarning={handleCloseWarning}
            handleWarningBoxSubmit={handleWarningBoxSubmit}
            warning={warning}
          />

          {openModal && (
            <DialogResult
              openModal={openModal}
              closeResultModalClick={closeResultModalClick}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Index;
