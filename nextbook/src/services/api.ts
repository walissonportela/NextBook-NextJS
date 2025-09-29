import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://localhost:4000/api/v1', // URL para desenvolvimento local
  baseURL: process.env.NEXT_PUBLIC_API_URL,   // URL para produção (Vercel)
});

export default api;