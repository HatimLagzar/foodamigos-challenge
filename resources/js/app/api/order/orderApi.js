import axios from 'axios';
import toastr from 'toastr';

export const getAllOrders = () => {
  return axios.get('/api/orders').catch((error) => {
    if (error.response && error.response.status === 500) {
      toastr.error(error.response.data.message);
    }
  });
};

export const createOrder = (authToken, formData) => {
  return axios.post('/api/orders/', formData, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }).catch((error) => {
    if (error.response && error.response.status === 500) {
      toastr.error(error.response.data.message);
    }
  });
}
