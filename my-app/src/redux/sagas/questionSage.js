import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import _get from "lodash/get";
import {
  getListQuestionSuccess,
  getListQuestionFailed,
} from "../actions/question";
import { GET_LIST_QUESTION } from "../constants/question";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// function that makes the api request and returns a Promise for response
async function fetchQuestion() {
  await sleep(1000);
  return axios({
    method: "GET",
    url: "http://localhost:3000/question",
  });
}

// worker saga: makes the api call when watcher saga sees the action
function* callApiQuestion() {
  try {
    const response = yield call(fetchQuestion);
    const data = _get(response, "data", []);
    yield put(getListQuestionSuccess(data));
  } catch (error) {
    yield put(getListQuestionFailed(error));
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* questionSaga() {
  yield takeLatest(GET_LIST_QUESTION, callApiQuestion);
}
