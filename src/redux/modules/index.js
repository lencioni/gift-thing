import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

import currentUser from './currentUser';
import groups from './groups';

export default combineReducers({
  currentUser,
  groups,
  router: routeReducer,
});
