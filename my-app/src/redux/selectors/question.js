import { createSelector } from "reselect";
import { initialState } from "../reducers/question";

/**
 * Direct selector to the app state domain
 */

const selectQuestionDomain = (state) => state.question || initialState;

const makeSelectListQuestion = () =>
  createSelector(selectQuestionDomain, (substate) => substate.listQuestion);

const makeSelectQuestion = () =>
  createSelector(selectQuestionDomain, (substate) => substate.selectQuestion);

const makeSelectTimeOut = () =>
  createSelector(selectQuestionDomain, (substate) => substate.timeOut);

const makeSelectStatusFlags = () =>
  createSelector(selectQuestionDomain, (substate) => substate.statusFlags);

export {
  makeSelectListQuestion,
  makeSelectStatusFlags,
  makeSelectQuestion,
  makeSelectTimeOut,
};
