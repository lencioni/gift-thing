import currentUser from './currentUser';
import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

export default combineReducers({
  currentUser,
  router: routeReducer,
});
