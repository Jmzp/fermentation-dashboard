import HttpClient from './HttpClient';

const { REACT_APP_BASE_URL, REACT_APP_FERMENTATION_ID } = process.env;
const API_ENDPOINT_ONE = `${REACT_APP_BASE_URL}/alerts`;
const API_ENDPOINT_TWO = `${REACT_APP_BASE_URL}/alert`;

class AlertsController {
  static async getAlerts() {
    return HttpClient.get(`${API_ENDPOINT_ONE}?fermentation_process_id=${REACT_APP_FERMENTATION_ID}`);
  }

  static async createAlert(type, value) {
    return HttpClient.post(`${API_ENDPOINT_TWO}`, {
      fermentation_process_id: REACT_APP_FERMENTATION_ID,
      type,
      value,
    });
  }

  static async updateAlert(idAlert, value) {
    return HttpClient.patch(`${API_ENDPOINT_TWO}/${idAlert}`, {
      changes:
        {
          value,
        },
    });
  }

  static async deleteAlert(idAlert) {
    return HttpClient.delete(`${API_ENDPOINT_TWO}/${idAlert}`);
  }
}

export default AlertsController;
