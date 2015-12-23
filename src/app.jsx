import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import configureStore from './redux/configureStore';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import fetch from 'utils/fetch';
import routes from './routes';
import { actions as currentUserActions } from 'redux/modules/currentUser';
import { syncReduxAndRouter } from 'redux-simple-router';

const history = createBrowserHistory();
const store = configureStore(window.__INITIAL_STATE__);

syncReduxAndRouter(history, store, (state) => state.router);

fetch('/api/me')
  .then(res => res.json())
  .then(json => store.dispatch(currentUserActions.logIn(json)));

// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
);
