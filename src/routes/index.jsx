import CoreLayout from 'layouts/CoreLayout';
import HomeView from 'views/HomeView';
import LoggedInHomeView from 'views/LoggedInHomeView';
import React from 'react';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route path="/" component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path="/home" component={LoggedInHomeView} />
  </Route>
);
