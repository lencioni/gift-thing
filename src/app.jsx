import { createHistory } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router';
import React from 'react';
import ReactDOM from 'react-dom';

import Root from './containers/Root';
import configureStore from './redux/configureStore';
import routes from './routes';

const history = createHistory();
const store = configureStore(window.__INITIAL_STATE__);

syncReduxAndRouter(history, store, (state) => state.router);

// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
);
