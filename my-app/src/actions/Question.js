export const SetOpenModalResult = (question) => {
  return {
    type: "SET_OPEN_MODAL_RESULT",
    payload: question,
  };
};

export const SetOpenModalWarning = (question) => {
  return {
    type: "SET_OPEN_MODAL_WARNING",
    payload: question,
  };
};

export const SetFlagStopTime = (question) => {
  return {
    type: "SET_FLAG_STOP_TIME",
    payload: question,
  };
};

export const SetTimeOut = (question) => {
  return {
    type: "SET_TIME_OUT",
    payload: question,
  };
};

export const SetResult = (question) => {
  return {
    type: "SET_RESULT",
    payload: question,
  };
};

export const SetCountUp = (question) => {
  return {
    type: "COUNT_UP",
    payload: question,
  };
};

export const SetCountDown = (question) => {
  return {
    type: "COUNT_DOWN",
    payload: question,
  };
};

export const SetCountIndex = (question) => {
  return {
    type: "COUNT_INDEX",
    payload: question,
  };
};

export const SetDataQuestion = (question) => {
  return {
    type: "FETCH_DATA_QUESTION",
    payload: question,
  };
};

export const SetLoading = (question) => {
  return {
    type: "LOADING",
    payload: question,
  };
};

export const SetSelectQuestion = (question) => {
  return {
    type: "SELECT_QUESTION",
    payload: question,
  };
};

export const SetSelectQuestionNull = (question) => {
  return {
    type: "SELECT_QUESTION_NULL",
    payload: question,
  };
};
