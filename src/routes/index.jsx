import { Route, IndexRoute } from 'react-router';
import React from 'react';

import CoreLayout from '../layouts/CoreLayout';
import HomeView from '../views/HomeView';
import LoggedInHomeView from '../views/LoggedInHomeView';

export default (
  <Route path="/" component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path="/home" component={LoggedInHomeView} />
  </Route>
);
