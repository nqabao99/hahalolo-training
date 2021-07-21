const initialState = {
  openModalResult: false,
  openModalWarning: false,
  flagStopTime: false,
  timeOut: 0,
  result: null,
  count: 0,
  dataQuestion: [],
  loading: true,
  selectQuestion: [],
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

    case "COUNT_UP": {
      let newCount;
      if (state.count < state.dataQuestion.length - 1) {
        newCount = action.payload + 1;
      }
      if (state.count === state.dataQuestion.length - 1) {
        newCount = action.payload;
      }
      return {
        ...state,
        count: newCount,
      };
    }

    case "COUNT_DOWN": {
      let newCount;
      if (state.count > 0) {
        newCount = action.payload - 1;
      }
      return {
        ...state,
        count: newCount,
      };
    }

    case "COUNT_INDEX": {
      let newCount = action.payload;
      return {
        ...state,
        count: newCount,
      };
    }

    case "FETCH_DATA_QUESTION": {
      // const newDataQuestion = [...state.dataQuestion, action.payload];
      const newDataQuestion = action.payload;
      return {
        ...state,
        dataQuestion: newDataQuestion,
      };
    }

    case "LOADING": {
      const newLoading = action.payload;
      return {
        ...state,
        loading: newLoading,
      };
    }

    case "SELECT_QUESTION": {
      let newSelectQuestion;
      let data = action.payload;
      if (state.selectQuestion.length > 0) {
        const index = state.selectQuestion.findIndex(
          (item) => item.parent_id === data.parent_id
        );
        if (index >= 0) {
          state.selectQuestion[index] = data;
          newSelectQuestion = [...state.selectQuestion];
        } else {
          newSelectQuestion = [...state.selectQuestion, data];
        }
      } else {
        newSelectQuestion = [...state.selectQuestion, data];
      }
      return {
        ...state,
        selectQuestion: newSelectQuestion,
      };
    }

    case "SELECT_QUESTION_NULL": {
      const selectQuestionNull = action.payload;
      return {
        ...state,
        selectQuestion: selectQuestionNull,
      };
    }

    default: {
      return state;
    }
  }
};

export default questionReducer;
