import HttpClient from './HttpClient';

const { REACT_APP_BASE_URL, REACT_APP_FERMENTATION_ID } = process.env;
const API_ENDPOINT = `${REACT_APP_BASE_URL}/sensors_data/temperature`;

class TemperatureController {
  static async getTemperatureValues(initialDate, endDate) {
    return HttpClient.get(`${API_ENDPOINT}/${REACT_APP_FERMENTATION_ID}?initial_date=${initialDate}&final_date=${endDate}`);
  }
}

export default TemperatureController;
