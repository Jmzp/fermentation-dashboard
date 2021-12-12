import { makeAutoObservable, observable, flow } from 'mobx';
import { AlertsController } from '../controllers';
import { CONSTANTS } from '../constants';
import strings from '../localization';

class AlertStore {
  phAlert = '';

  temperatureAlert = '';

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      phAlert: observable,
      temperatureAlert: observable,
      loadAlerts: flow,
      createAlert: flow,
    });
  }

  * loadAlerts() {
    try {
      const { data: { data } } = yield AlertsController.getAlerts();
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < data.length; i++) {
        const alert = data[i];
        if (alert.type === CONSTANTS.ALERTS_TYPE.temperature) {
          this.temperatureAlert = alert;
        }
        if (alert.type === CONSTANTS.ALERTS_TYPE.ph) {
          this.phAlert = alert;
        }
      }
    } catch (e) {
      this.rootStore.setCurrentError(strings.errors.getAlertsError);
    }
  }

  * createAlert(type, value) {
    try {
      const { data: { data } } = yield AlertsController.createAlert(type, value);
      console.log(data);
    } catch (e) {
      this.rootStore.setCurrentError(strings.errors.createAlertError);
    }
  }

  * updateAlert(id, value) {
    try {
      const { data: { data } } = yield AlertsController.updateAlert(id, value);
      console.log(data);
    } catch (e) {
      this.rootStore.setCurrentError(strings.errors.updateAlertError);
    }
  }

  * deleteArt(id) {
    try {
      const { data: { data } } = yield AlertsController.deleteAlert(id);
      console.log(data);
    } catch (e) {
      this.rootStore.setCurrentError(strings.errors.deleteAlertError);
    }
  }
}

export default AlertStore;
