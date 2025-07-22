import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // ton API de dev
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
