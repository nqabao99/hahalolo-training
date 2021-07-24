import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import _get from "lodash/get";
import {
  getListAccountSuccess,
  getListAccountFailed,
  regesterAccountSuccess,
  regesterAccountFailed,
} from "../actions/account";
import { GET_LIST_ACCOUNT, REGESTER_ACCOUNT } from "../constants/account";

// function that makes the api request and returns a Promise for response
function fetchAccount() {
  return axios({
    method: "GET",
    url: "http://localhost:3000/accounts",
  });
}

function registerAccount(infoAccount) {
  return fetch("http://localhost:3000/accounts", {
    method: "POST",
    body: JSON.stringify(infoAccount),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

// worker saga: makes the api call when watcher saga sees the action
function* callApiAccount() {
  try {
    const response = yield call(fetchAccount);
    const data = _get(response, "data", []);
    yield put(getListAccountSuccess(data));
  } catch (error) {
    yield put(getListAccountFailed(error));
  }
}

function* callApiRegesterAccount({ infoAccount }) {
  try {
    const response = yield call(registerAccount, infoAccount);

    if (response.status === 201) {
      yield put(regesterAccountSuccess(infoAccount));
    } else {
      yield put(regesterAccountFailed(response));
    }
  } catch (error) {
    yield put(regesterAccountFailed(error));
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* accountSaga() {
  yield takeLatest(GET_LIST_ACCOUNT, callApiAccount);
  yield takeLatest(REGESTER_ACCOUNT, callApiRegesterAccount);
}
