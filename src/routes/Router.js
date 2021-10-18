import React from 'react';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import { Home, PageError, Login } from '../pages';
import { ProtectedRoute } from '../components';

export default () => (
  <BrowserRouter>
    <Switch>
      <ProtectedRoute path="/home" component={Home} />
      <Route path="/" component={Login} exact />
      <Route component={PageError} />
    </Switch>
  </BrowserRouter>
);
