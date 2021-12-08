import { flow, makeAutoObservable, observable } from 'mobx';
import moment from 'moment';
import { PhController } from '../controllers';
import strings from '../localization';

const DATE_FORMAT = 'YYYY-MM-DD';

class PhStore {
  phValues = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      phValues: observable,
      loadPhByInterval: flow,
    });
  }

  * loadPhByInterval(startDate, endDate) {
    try {
      const startDateString = moment(startDate).format(DATE_FORMAT).toString();
      const endDateString = moment(endDate).format(DATE_FORMAT).toString();
      const { data } = yield PhController.getPhValues(startDateString, endDateString);
      this.phValues = data;
    } catch (e) {
      this.rootStore.errorStore.setCurrentError(strings.errors.phError);
    }
  }
}

export default PhStore;
