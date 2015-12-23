import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const CURRENT_USER_LOG_IN = 'CURRENT_USER_LOG_IN';
export const CURRENT_USER_LOG_OUT = 'CURRENT_USER_LOG_OUT';

// ------------------------------------
// Actions
// ------------------------------------
export const logIn = createAction(CURRENT_USER_LOG_IN, user => user);
export const logOut = createAction(CURRENT_USER_LOG_OUT, user => user);

export const actions = {
  logIn,
  logOut,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [CURRENT_USER_LOG_IN]: (state, { payload }) => payload,
  [CURRENT_USER_LOG_OUT]: () => null,
}, null);
