import produce from "immer";
import {
  GET_LIST_ACCOUNT,
  GET_LIST_ACCOUNT_SUCCESS,
  GET_LIST_ACCOUNT_FAILED,
  REGESTER_ACCOUNT,
  REGESTER_ACCOUNT_SUCCESS,
  REGESTER_ACCOUNT_FAILED,
  SET_ISSUCCESS,
  GET_ACCOUNT,
} from "../constants/account";

export const initialState = {
  listAccount: [],
  infoAccount: null,
  statusFlags: {
    isLoading: false,
    isSuccess: false,
  },
  log: {
    error: "",
  },
};

/* eslint-disable default-case, no-param-reassign */
const accountReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const { type } = action;
    switch (type) {
      case GET_LIST_ACCOUNT: {
        draft.statusFlags.isLoading = true;
        break;
      }
      case GET_LIST_ACCOUNT_SUCCESS: {
        draft.statusFlags.isLoading = false;
        draft.listAccount = action.payload;
        break;
      }
      case GET_LIST_ACCOUNT_FAILED: {
        draft.statusFlags.isLoading = false;
        draft.log.error = action.message;
        break;
      }

      case REGESTER_ACCOUNT: {
        draft.statusFlags.isLoading = true;
        draft.statusFlags.isSuccess = false;
        break;
      }

      case REGESTER_ACCOUNT_SUCCESS: {
        draft.statusFlags.isLoading = false;
        draft.statusFlags.isSuccess = true;
        draft.listAccount = [...state.listAccount, action.payload];
        localStorage.setItem("user-info", JSON.stringify(action.payload));
        break;
      }

      case REGESTER_ACCOUNT_FAILED: {
        draft.statusFlags.isLoading = false;
        draft.statusFlags.isSuccess = false;
        draft.log.error = action.message;
        break;
      }
      case SET_ISSUCCESS: {
        draft.statusFlags.isSuccess = false;
        break;
      }

      case GET_ACCOUNT: {
        draft.infoAccount = action.account;
        break;
      }
    }
  });

export default accountReducer;
