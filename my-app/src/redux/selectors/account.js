import { createSelector } from "reselect";
import { initialState } from "../reducers/account";

/**
 * Direct selector to the app state domain
 */

const selectAccountDomain = (state) => state.account || initialState;

const makeSelectListAccount = () =>
  createSelector(selectAccountDomain, (substate) => substate.listAccount);

const makeSelectAccount = () =>
  createSelector(selectAccountDomain, (substate) => substate.infoAccount);

const makeSelectStatusFlags = () =>
  createSelector(selectAccountDomain, (substate) => substate.statusFlags);

export { makeSelectListAccount, makeSelectStatusFlags, makeSelectAccount };
