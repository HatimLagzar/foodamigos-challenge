import axios from 'axios';
import toastr from 'toastr';

export const getAllProducts = (page = null) => {
  return axios.get(page || '/api/products').catch((error) => {
    if (error.response && error.response.status === 500) {
      toastr.error(error.response.data.message);
    }
  });
};

export const findById = (id) => {
  return axios.get('/api/products/' + id).catch((error) => {
    if (error.response && error.response.status === 500) {
      toastr.error(error.response.data.message);
    }
  });
}
