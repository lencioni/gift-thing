import currentUser from './currentUser';
import groups from './groups';
import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

export default combineReducers({
  currentUser,
  groups,
  router: routeReducer,
});
