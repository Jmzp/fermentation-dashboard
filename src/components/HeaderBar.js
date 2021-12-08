import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Button, AppBar, makeStyles,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { TextStyles } from '../theme';

const useStyles = makeStyles({
  title: {
    ...TextStyles.poppinsBoldText,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    margin: '2vh',
    flex: 1,
  },
  buttonsContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

const HeaderBar = () => {
  const { logout } = useAuth0();
  const history = useHistory();
  const classes = useStyles();
  const onClickLogoutButton = () => logout({
    returnTo: window.location.origin,
  });

  const onClickGenerateReport = async () => {
    history.push('/generate-report');
  };

  return (
    <AppBar position="static">
      <div className={classes.container}>
        <h3 className={classes.title}>
          Fermentación Alcohólica
        </h3>
        <div className={classes.buttonsContainer}>
          <Button
            variant="contained"
            onClick={onClickGenerateReport}
          >
            Generar Reporte
          </Button>
          <Button
            color="inherit"
            onClick={onClickLogoutButton}
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </AppBar>
  );
};

export default HeaderBar;
