import { register } from '../../api/auth/registerApi';
import toastr from 'toastr';

class RegisterService {
  register(name, phoneNumber, password, address) {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('phone_number', phoneNumber);
    formData.set('password', password);
    formData.set('address', address);

    return register(formData).catch((error) => {
      if (error.response) {
        if (error.response.status === 422) {
          toastr.error(error.response.data.message);

          return error;
        }
      }

      console.error(error);

      throw error;
    });
  }
}

export default new RegisterService();
