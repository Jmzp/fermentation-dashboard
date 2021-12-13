import React from 'react';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import { observer } from 'mobx-react';
import { CssBaseline } from '@material-ui/core';
import { positions, Provider } from 'react-alert';
import AlertMUITemplate from 'react-alert-template-mui';
import { Router } from './routes';
import 'moment/locale/es';

moment.locale('es'); // it is required to select default locale manually
const options = {
  position: positions.MIDDLE,
};

export const App = () => (
  <>
    <CssBaseline />
    <Provider template={AlertMUITemplate} {...options}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Router />
      </MuiPickersUtilsProvider>
    </Provider>
  </>
);

export default observer(App);
