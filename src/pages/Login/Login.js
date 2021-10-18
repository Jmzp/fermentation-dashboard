import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core';
import useStyles from './Login.styles';

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <span className={classes.title}>
        Sistema de monitoreo, registro y evaluación
        {' '}
        <br />
        {' '}
        de variables de fermentación alcohólica
      </span>
      <Button variant="contained" color="primary" onClick={() => loginWithRedirect()}>Iniciar Sesión</Button>
    </div>
  );
};

export default Login;
