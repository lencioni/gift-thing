import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const GROUPS_RECEIVE = 'GROUPS_RECEIVE';

// ------------------------------------
// Actions
// ------------------------------------
export const receiveGroups = createAction(GROUPS_RECEIVE, groups => groups);

export const actions = {
  receiveGroups,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [GROUPS_RECEIVE]: (state, { payload }) => payload,
}, null);
