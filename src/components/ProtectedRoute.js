import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Login } from '../pages';

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Login />, // cambiar por pagina de cargando
    })}
    {...args}
  />
);

export default ProtectedRoute;
