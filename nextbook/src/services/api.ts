import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://localhost:4000/api/v1', 
  baseURL: 'process.env.NEXT_PUBLIC_API_URL', 
});

export default api;