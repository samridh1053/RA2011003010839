import axios from 'axios';

const BASE_URL = 'http://20.244.56.144:80/train';

export const registerCompany = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAuthToken = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTrains = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/trains`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTrainDetail = async (trainNumber, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/trains/${trainNumber}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
