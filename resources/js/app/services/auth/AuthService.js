import { login } from '../../api/auth/loginApi';
import toastr from 'toastr';

class AuthService {
  login(phoneNumber, password) {
    const formData = new FormData();
    formData.set('phone_number', phoneNumber);
    formData.set('password', password);

    return login(formData).then((response) => {
      const token = response.data.token;
      this.saveToken(token);

      toastr.success(response.data.message);

      return response;
    }).catch((error) => {
      if (error.response) {
        if (error.response.status) {
          toastr.error('Incorrect credentials!');

          return;
        }

        toastr.error(error.response.data.message);

        return;
      }

      console.log(error);
    });
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  /**
   * @returns {boolean}
   */
  hasBeenAuthenticated() {
    return localStorage.getItem('authToken') !== null;
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  /**
   * Save the token in localStorage
   *
   * @param {string} token
   */
  saveToken(token) {
    localStorage.setItem('authToken', token);
  }
}

export default new AuthService();
