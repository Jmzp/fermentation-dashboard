import React from 'react';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import { observer } from 'mobx-react';
import { Router } from './routes';
import 'moment/locale/es';

moment.locale('es'); // it is required to select default locale manually

export const App = () => (
  <>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Router />
    </MuiPickersUtilsProvider>
  </>
);

export default observer(App);
