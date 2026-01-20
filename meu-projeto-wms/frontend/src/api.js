import axios from 'axios';

const api = axios.create({
  // Use EXATAMENTE o endereço que aparece no terminal do Python
  baseURL: 'http://127.0.0.1:8000', 
});

export default api;