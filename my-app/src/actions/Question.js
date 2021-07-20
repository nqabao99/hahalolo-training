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
