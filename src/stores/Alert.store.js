import { makeAutoObservable, observable, flow } from 'mobx';
import { AlertsController } from '../controllers';
import { CONSTANTS } from '../constants';
import strings from '../localization';

class AlertStore {
  phAlert = {};

  temperatureAlert = {};

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
      this.rootStore.errorStore.setCurrentError(strings.errors.getAlertsError);
    }
  }

  * createAlert(type, value) {
    try {
      yield AlertsController.createAlert(type, value);
      return true;
    } catch (e) {
      this.rootStore.errorStore.setCurrentError(strings.errors.createAlertError);
      return false;
    }
  }

  * updateAlert(id, value) {
    try {
      yield AlertsController.updateAlert(id, value);
      return true;
    } catch (e) {
      this.rootStore.errorStore.setCurrentError(strings.errors.updateAlertError);
      return false;
    }
  }

  * deleteArt(id) {
    try {
      yield AlertsController.deleteAlert(id);
      if (this.phAlert.id === id) {
        this.phAlert = {};
      }
      if (this.temperatureAlert.id === id) {
        this.temperatureAlert = {};
      }
      return true;
    } catch (e) {
      this.rootStore.errorStore.setCurrentError(strings.errors.deleteAlertError);
      return false;
    }
  }
}

export default AlertStore;
