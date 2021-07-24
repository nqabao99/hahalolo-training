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

export function getListResult() {
  return {
    type: GET_LIST_RESULT,
  };
}

export function getListResultSuccess(payload) {
  return {
    type: GET_LIST_RESULT_SUCCESS,
    payload,
  };
}

export function getListResultFailed(message = "") {
  return {
    type: GET_LIST_RESULT_FAILED,
    message,
  };
}

export function updateListResult(id, infoResult) {
  return {
    type: UPDATE_LIST_RESULT,
    id,
    infoResult,
  };
}

export function updateListResultSuccess(payload) {
  return {
    type: UPDATE_LIST_RESULT_SUCCESS,
    payload,
  };
}

export function updateListResultFailed(message = "") {
  return {
    type: UPDATE_LIST_RESULT_FAILED,
    message,
  };
}

export function addResult(infoResult) {
  return {
    type: ADD_RESULT,
    infoResult,
  };
}

export function addResultSuccess(payload) {
  return {
    type: ADD_RESULT_SUCCESS,
    payload,
  };
}

export function addResultFailed(message = "") {
  return {
    type: ADD_RESULT_FAILED,
    message,
  };
}
