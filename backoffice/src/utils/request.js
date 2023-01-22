import axios from 'axios';

const request = axios.create({
  baseURL: process.env.REACT_APP_API || 'http://localhost:8080',
  headers: {
    Authorization: localStorage.getItem('access_token'),
  },
});

export default request;
