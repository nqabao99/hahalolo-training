import produce from "immer";
import {
  GET_LIST_QUESTION,
  GET_LIST_QUESTION_SUCCESS,
  GET_LIST_QUESTION_FAILED,
  ADD_SELECT_QUESTION,
  RESET_SELECT_QUESTION,
  STOP_TIME,
  RESET_STOP_TIME,
  GET_TIME_OUT,
  RESET_TIME_OUT,
} from "../constants/question";

export const initialState = {
  listQuestion: [],
  selectQuestion: [],
  timeOut: 0,
  statusFlags: {
    isLoading: false,
    isStopTime: false,
  },
  log: {
    error: "",
  },
};

const questionReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const { type } = action;
    switch (type) {
      case GET_LIST_QUESTION: {
        draft.statusFlags.isLoading = true;
        break;
      }
      case GET_LIST_QUESTION_SUCCESS: {
        draft.statusFlags.isLoading = false;
        draft.listQuestion = action.payload;
        break;
      }
      case GET_LIST_QUESTION_FAILED: {
        draft.statusFlags.isLoading = false;
        draft.log.error = action.message;
        break;
      }

      case ADD_SELECT_QUESTION: {
        if (state.selectQuestion.length > 0) {
          const index = state.selectQuestion.findIndex(
            (item) => item.parent_id === action.question.parent_id
          );
          if (index >= 0) {
            state.selectQuestion[index] = action.question;
            draft.selectQuestion = [...state.selectQuestion];
          } else {
            draft.selectQuestion = [...state.selectQuestion, action.question];
          }
        } else {
          draft.selectQuestion = [...state.selectQuestion, action.question];
        }
        break;
      }

      case RESET_SELECT_QUESTION: {
        draft.selectQuestion = action.question;
        break;
      }

      case STOP_TIME: {
        draft.statusFlags.isStopTime = true;
        break;
      }

      case RESET_STOP_TIME: {
        draft.statusFlags.isStopTime = false;
        break;
      }

      case GET_TIME_OUT: {
        draft.timeOut = action.time;
        break;
      }

      case RESET_TIME_OUT: {
        draft.timeOut = 0;
        break;
      }

      default: {
        break;
      }
    }
  });

export default questionReducer;
