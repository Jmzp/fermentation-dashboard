import HttpClient from './HttpClient';
import CONFIG from '../config';

const ENV = CONFIG.getEnv();
const API_ENDPOINT = `${ENV.REACT_APP_BASE_URL}/sensors_data/temperature`;
const fermentationId = 'ccbb63c0-a8cd-47b7-8445-5d85e9c80977';

class TemperatureController {
  static async getTemperatureValues(initialDate, endDate) {
    return HttpClient.get(`${API_ENDPOINT}/${fermentationId}?initial_date=${initialDate}&final_date=${endDate}`);
  }
}

export default TemperatureController;
