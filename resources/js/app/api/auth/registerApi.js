import axios from 'axios';

export const register = (formData) => {
  return axios.post('/api/register', formData);
};
