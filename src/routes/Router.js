import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { Home, PageError } from '../pages';

export default () => (
  <BrowserRouter>
    <Redirect
      from="/"
      to="/home"
    />
    <Switch>
      <Route path="/home" component={Home} exact />
      <Route component={PageError} />
    </Switch>
  </BrowserRouter>
);
