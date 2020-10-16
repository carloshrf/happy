import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.16.25.18:3333',
});

export default api;