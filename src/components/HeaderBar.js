import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Button, AppBar, makeStyles,
} from '@material-ui/core';
import { TextStyles } from '../theme';

const useStyles = makeStyles({
  title: {
    ...TextStyles.poppinsBoldText,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    margin: '2vh',
  },
});

const HeaderBar = () => {
  const { logout } = useAuth0();
  const classes = useStyles();

  return (
    <AppBar position="static">
      <div className={classes.container}>
        <h3 className={classes.title}>
          Fermentación Alcohólica
        </h3>
        <Button
          color="inherit"
          onClick={() => logout({
            returnTo: window.location.origin,
          })}
        >
          Cerrar Sesión
        </Button>
      </div>
    </AppBar>
  );
};

export default HeaderBar;
