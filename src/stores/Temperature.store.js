import {
  computed, flow, makeAutoObservable, observable,
} from 'mobx';
import moment from 'moment';
import { TemperatureController } from '../controllers';
import strings from '../localization';
import { CONSTANTS } from '../constants';

const DATE_FORMAT = 'YYYY-MM-DD';

class TemperatureStore {
  temperatureObject = { temperature: [], time: [] }

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      temperatureObject: observable,
      loadTemperatureByInterval: flow,
      averageOfTemperature: computed,
    });
  }

  * loadTemperatureByInterval(startDate, endDate) {
    try {
      const startDateString = moment(startDate).format(DATE_FORMAT).toString();
      const endDateString = moment(endDate).format(DATE_FORMAT).toString();
      const { data } = yield TemperatureController.getTemperatureValues(
        startDateString, endDateString,
      );
      const temperature = data.data.map((elem) => elem.value);
      const time = data.data.map(
        (elem) => moment(elem.inserted_at)
          .format(CONSTANTS.DATE_FORMAT_TO_CHART),
      );
      this.temperatureObject = { temperature, time };
    } catch (e) {
      this.rootStore.errorStore.setCurrentError(strings.errors.temperatureError);

      // remove this
      const dataTemp = {
        data: [
          {
            id: 'b1fa6662-7deb-4740-8d42-d0ad2ec8d27b',
            inserted_at: '2021-11-27T00:27:29',
            mac_sensor: 'ABCD',
            value: 23.50,
          },
          {
            id: 'b1fa6662-7deb-4740-8d42-d0ad2ec8d27b',
            inserted_at: '2021-11-27T00:37:29',
            mac_sensor: 'ABCD',
            value: 23.45,
          },
          {
            id: 'b1fa6662-7deb-4740-8d42-d0ad2ec8d27b',
            inserted_at: '2021-11-27T01:47:29',
            mac_sensor: 'ABCD',
            value: 23.30,
          },
          {
            id: 'b1fa6662-7deb-4740-8d42-d0ad2ec8d27b',
            inserted_at: '2021-11-27T02:47:29',
            mac_sensor: 'ABCD',
            value: 24.80,
          },
          {
            id: 'b1fa6662-7deb-4740-8d42-d0ad2ec8d27b',
            inserted_at: '2021-11-27T03:47:29',
            mac_sensor: 'ABCD',
            value: 25.00,
          },
        ],
        status: 'success',
      };
      const temperature = dataTemp.data.map((elem) => elem.value);
      const time = dataTemp.data.map(
        (elem) => moment(elem.inserted_at)
          .format(CONSTANTS.DATE_FORMAT_TO_CHART),
      );
      this.temperatureObject = { temperature, time };
    }
  }

  get averageOfTemperature() {
    if (this.temperatureObject.temperature.length) {
      const sum = this.temperatureObject.temperature
        .reduce((previousValue, currentValue) => previousValue + currentValue);
      return sum / this.temperatureObject.temperature.length;
    }
    return 0;
  }
}

export default TemperatureStore;
