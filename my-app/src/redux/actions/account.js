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

export function getListAccount() {
  return {
    type: GET_LIST_ACCOUNT,
  };
}

export function getListAccountSuccess(payload) {
  return {
    type: GET_LIST_ACCOUNT_SUCCESS,
    payload,
  };
}

export function getListAccountFailed(message = "") {
  return {
    type: GET_LIST_ACCOUNT_FAILED,
    message,
  };
}

export function getAccount(account) {
  return {
    type: GET_ACCOUNT,
    account,
  };
}

export function regesterAccount(infoAccount) {
  return {
    type: REGESTER_ACCOUNT,
    infoAccount,
  };
}

export function regesterAccountSuccess(payload) {
  return {
    type: REGESTER_ACCOUNT_SUCCESS,
    payload,
  };
}

export function regesterAccountFailed(message = "") {
  return {
    type: REGESTER_ACCOUNT_FAILED,
    message,
  };
}

export function setIsSuccess() {
  return {
    type: SET_ISSUCCESS,
  };
}
