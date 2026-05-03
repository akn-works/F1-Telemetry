import axios from 'axios';

// OpenF1 API configuration
export const openF1Api = axios.create({
  baseURL: 'https://api.openf1.org/v1',
  timeout: 10000,
});

openF1Api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('OpenF1 API Error:', error);
    return Promise.reject(error);
  }
);

// Jolpi API configuration (Historical Data)
export const jolpiApi = axios.create({
  baseURL: 'https://jolpi.ca/ergast/f1',
  timeout: 10000,
});

jolpiApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Jolpi API Error:', error);
    return Promise.reject(error);
  }
);
