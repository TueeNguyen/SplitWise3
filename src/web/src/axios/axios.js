import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost/api'
});
console.log(process.env.REACT_APP_API_URL);

export default axiosInstance;
