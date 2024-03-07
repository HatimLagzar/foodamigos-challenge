import axios from 'axios';

export const login = (formData) => {
  return axios.post('/api/login', formData);
};
