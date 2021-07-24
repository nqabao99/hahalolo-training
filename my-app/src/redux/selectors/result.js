import { createSelector } from "reselect";
import { initialState } from "../reducers/result";

/**
 * Direct selector to the app state domain
 */

const selectResultDomain = (state) => state.result || initialState;

const makeSelectListResult = () =>
  createSelector(selectResultDomain, (substate) => substate.listResult);

const makeSelectStatusFlags = () =>
  createSelector(selectResultDomain, (substate) => substate.statusFlags);

export { makeSelectListResult, makeSelectStatusFlags };
