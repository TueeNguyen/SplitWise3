import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:6060/api'
});
console.log(process.env.REACT_APP_API_URL);

export default axiosInstance;
