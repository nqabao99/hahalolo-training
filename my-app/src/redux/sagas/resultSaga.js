import axios from "axios";
import _get from "lodash/get";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  getListResultFailed,
  getListResultSuccess,
  updateListResultSuccess,
  updateListResultFailed,
  addResultSuccess,
  addResultFailed,
} from "../actions/result";
import {
  GET_LIST_RESULT,
  UPDATE_LIST_RESULT,
  ADD_RESULT,
} from "../constants/result";

// function that makes the api request and returns a Promise for response
function fetchResult() {
  return axios({
    method: "GET",
    url: "http://localhost:3000/listResult",
  });
}

function UpdateResult({ id, infoResult }) {
  return axios.patch(`http://localhost:3000/listResult/${id}`, infoResult);
}

function AddResult({ infoResult }) {
  return axios.post("http://localhost:3000/listResult", infoResult);
}

// worker saga: makes the api call when watcher saga sees the action
function* callApiResult() {
  try {
    const response = yield call(fetchResult);
    const data = _get(response, "data", []);
    yield put(getListResultSuccess(data));
  } catch (error) {
    yield put(getListResultFailed(error));
  }
}

function* callApiUpdateResult({ id, infoResult }) {
  try {
    const response = yield call(UpdateResult, { id, infoResult });
    if (response.status === 200) {
      yield put(updateListResultSuccess({ id, infoResult }));
    } else {
      yield put(updateListResultFailed(response));
    }
  } catch (error) {
    yield put(updateListResultFailed(error));
  }
}

function* callApiAddResult({ infoResult }) {
  try {
    const response = yield call(AddResult, { infoResult });
    if (response.status === 201) {
      yield put(addResultSuccess(infoResult));
    } else {
      yield put(addResultFailed(response));
    }
  } catch (error) {
    yield put(addResultFailed(error));
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* rerultSaga() {
  yield takeLatest(GET_LIST_RESULT, callApiResult);
  yield takeLatest(UPDATE_LIST_RESULT, callApiUpdateResult);
  yield takeLatest(ADD_RESULT, callApiAddResult);
}
