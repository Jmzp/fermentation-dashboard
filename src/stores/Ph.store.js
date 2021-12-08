import {
  computed, flow, makeAutoObservable, observable,
} from 'mobx';
import moment from 'moment';
import { PhController } from '../controllers';
import strings from '../localization';
import { CONSTANTS } from '../constants';

const DATE_FORMAT = 'YYYY-MM-DD';

class PhStore {
  phObject = { ph: [], time: [] };

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      phObject: observable,
      loadPhByInterval: flow,
      averageOfPh: computed,
    });
  }

  * loadPhByInterval(startDate, endDate) {
    try {
      const startDateString = moment(startDate).format(DATE_FORMAT).toString();
      const endDateString = moment(endDate).format(DATE_FORMAT).toString();
      const { data } = yield PhController.getPhValues(startDateString, endDateString);
      const ph = data.data.map((elem) => elem.value);
      const time = data.data.map(
        (elem) => moment(elem.inserted_at)
          .format(CONSTANTS.DATE_FORMAT_TO_CHART),
      );
      this.phObject = { ph, time };
    } catch (e) {
      this.rootStore.errorStore.setCurrentError(strings.errors.phError);

      // remove this
      const dataTemp = {
        data: [
          {
            id: 'b1fa6662-7deb-4740-8d42-d0ad2ec8d27b',
            inserted_at: '2021-11-27T00:27:29',
            mac_sensor: 'ABCD',
            value: 3.39,
          },
          {
            id: 'b1fa6662-7deb-4740-8d42-d0ad2ec8d27b',
            inserted_at: '2021-11-27T00:37:29',
            mac_sensor: 'ABCD',
            value: 3.4,
          },
          {
            id: 'b1fa6662-7deb-4740-8d42-d0ad2ec8d27b',
            inserted_at: '2021-11-27T01:47:29',
            mac_sensor: 'ABCD',
            value: 3.5,
          },
          {
            id: 'b1fa6662-7deb-4740-8d42-d0ad2ec8d27b',
            inserted_at: '2021-11-27T02:47:29',
            mac_sensor: 'ABCD',
            value: 3.6,
          },
          {
            id: 'b1fa6662-7deb-4740-8d42-d0ad2ec8d27b',
            inserted_at: '2021-11-27T03:47:29',
            mac_sensor: 'ABCD',
            value: 3.7,
          },
        ],
        status: 'success',
      };
      const ph = dataTemp.data.map((elem) => elem.value);
      const time = dataTemp.data.map(
        (elem) => moment(elem.inserted_at)
          .format(CONSTANTS.DATE_FORMAT_TO_CHART),
      );
      this.phObject = { ph, time };
    }
  }

  get averageOfPh() {
    if (this.phObject.ph.length) {
      const sum = this.phObject.ph
        .reduce((previousValue, currentValue) => previousValue + currentValue);
      return sum / this.phObject.ph.length;
    }
    return 0;
  }
}

export default PhStore;
