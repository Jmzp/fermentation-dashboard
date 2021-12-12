import React from 'react';
import ErrorStore from './Error.store';
import PhStore from './Ph.store';
import TemperatureStore from './Temperature.store';
import AlertStore from './Alert.store';

class RootStore {
  constructor() {
    this.errorStore = new ErrorStore(this);
    this.phStore = new PhStore(this);
    this.temperatureStore = new TemperatureStore(this);
    this.alertStore = new AlertStore(this);
  }
}

const StoresContext = React.createContext(new RootStore());

// this will be the function available for the app to connect to the stores
// eslint-disable-next-line import/prefer-default-export
export const useStores = () => React.useContext(StoresContext);
