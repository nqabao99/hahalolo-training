const initialState = {
  openModalResult: false,
  openModalWarning: false,
  flagStopTime: false,
  timeOut: 0,
  result: null,
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_OPEN_MODAL_RESULT": {
      const newOpenModalRusult = action.payload;
      return {
        ...state,
        openModalResult: newOpenModalRusult,
      };
    }

    case "SET_OPEN_MODAL_WARNING": {
      const newOpenModalWarning = action.payload;
      return {
        ...state,
        openModalWarning: newOpenModalWarning,
      };
    }

    case "SET_FLAG_STOP_TIME": {
      const newFlagStopTime = action.payload;
      return {
        ...state,
        flagStopTime: newFlagStopTime,
      };
    }

    case "SET_TIME_OUT": {
      const newTimeOut = action.payload;
      return {
        ...state,
        timeOut: newTimeOut,
      };
    }

    case "SET_RESULT": {
      const newResult = action.payload;
      return {
        ...state,
        result: newResult,
      };
    }

    default: {
      return state;
    }
  }
};

export default questionReducer;
