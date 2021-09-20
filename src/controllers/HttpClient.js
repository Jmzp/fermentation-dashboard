import axios from 'axios';
import log from 'loglevel';
import strings from '../localization';

const ENV = process.env;

const client = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: ENV.REACT_APP_API_TOKEN,
  },
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    log.warn(error);
    if (!error.response) {
      throw new Error(strings.errors.connectionError);
    }
    return Promise.reject(error);
  },
);

const setAuthorization = (token) => {
  client.defaults.headers.common.authorization = token;
};

export default { ...client, setAuthorization };
