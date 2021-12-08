import { flow, makeAutoObservable, observable } from 'mobx';
import moment from 'moment';
import { TemperatureController } from '../controllers';
import strings from '../localization';

const DATE_FORMAT = 'YYYY-MM-DD';

class TemperatureStore {
  temperatureValues = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      phValues: observable,
      loadTemperatureByInterval: flow,
    });
  }

  * loadTemperatureByInterval(startDate, endDate) {
    try {
      const startDateString = moment(startDate).format(DATE_FORMAT).toString();
      const endDateString = moment(endDate).format(DATE_FORMAT).toString();
      const { data } = yield TemperatureController.getTemperatureValues(
        startDateString, endDateString,
      );
      this.phValues = data;
    } catch (e) {
      this.rootStore.errorStore.setCurrentError(strings.errors.temperatureError);
    }
  }
}

export default TemperatureStore;
