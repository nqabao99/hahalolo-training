import produce from "immer";
import {
  GET_LIST_RESULT,
  GET_LIST_RESULT_SUCCESS,
  GET_LIST_RESULT_FAILED,
  UPDATE_LIST_RESULT,
  UPDATE_LIST_RESULT_SUCCESS,
  UPDATE_LIST_RESULT_FAILED,
  ADD_RESULT,
  ADD_RESULT_SUCCESS,
  ADD_RESULT_FAILED,
} from "../constants/result";

export const initialState = {
  listResult: [],
  statusFlags: {
    isLoading: false,
  },
  log: {
    error: "",
  },
};

const resultReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const { type } = action;
    switch (type) {
      case GET_LIST_RESULT: {
        draft.statusFlags.isLoading = true;
        break;
      }
      case GET_LIST_RESULT_SUCCESS: {
        draft.statusFlags.isLoading = false;
        draft.listResult = action.payload.sort((a, b) =>
          b.scores === a.scores ? b.timeOut - a.timeOut : b.scores - a.scores
        );
        break;
      }
      case GET_LIST_RESULT_FAILED: {
        draft.statusFlags.isLoading = false;
        draft.log.error = action.message;
        break;
      }

      case UPDATE_LIST_RESULT: {
        draft.statusFlags.isLoading = true;
        // draft.statusFlags.isSuccess = false;
        break;
      }

      case UPDATE_LIST_RESULT_SUCCESS: {
        draft.statusFlags.isLoading = false;
        // draft.statusFlags.isSuccess = true;
        const index = state.listResult.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index >= 0) {
          draft.listResult[index] = {
            ...state.listResult[index],
            ...action.payload.infoResult,
          };
        }
        break;
      }

      case ADD_RESULT: {
        draft.statusFlags.isLoading = true;
        break;
      }

      case ADD_RESULT_SUCCESS: {
        draft.statusFlags.isLoading = false;
        draft.listResult = [...state.listResult, action.payload];
        console.log(action.payload);
        break;
      }
      case ADD_RESULT_FAILED: {
        draft.statusFlags.isLoading = false;
        draft.log.error = action.message;
        break;
      }

      case UPDATE_LIST_RESULT_FAILED: {
        draft.statusFlags.isLoading = false;
        // draft.statusFlags.isSuccess = false;
        draft.log.error = action.message;
        break;
      }

      default: {
        break;
      }
    }
  });

export default resultReducer;
