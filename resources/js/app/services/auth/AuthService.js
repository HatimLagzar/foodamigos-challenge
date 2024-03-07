import { login, refresh } from '../../api/auth/loginApi';
import { jwtDecode } from 'jwt-decode';
import toastr from 'toastr';

class AuthService {
  login(phoneNumber, password) {
    const formData = new FormData();
    formData.set('phone_number', phoneNumber);
    formData.set('password', password);

    return login(formData)
      .then((response) => {
        const token = response.data.token;
        // const user = jwtDecode(token, { header: true });
        //
        // localStorage.setItem('authToken', token);
        // localStorage.setItem('authUser', JSON.stringify(user));

        toastr.success(response.data.message);

        return response;
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            toastr.error('Incorrect credentials!')

            return
          }

          toastr.error(error.response.data.message)

          return
        }

        console.log(error)
      });
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  }

  getAuthUser() {
    return JSON.parse(localStorage.getItem('authUser'));
  }

  /**
   * @returns {boolean}
   */
  hasBeenAuthenticated() {
    return (
      localStorage.getItem('authToken') !== null &&
      localStorage.getItem('authUser') !== null
    );
  }

  isExpired() {
    if (this.getToken() === 'undefined') {
      this.logout()

      return true;
    }

    if (this.hasBeenAuthenticated()) {
      const token = this.getToken();
      const user = jwtDecode(token);

      return (user.exp * 1000 + new Date().getTime()) < new Date().getTime();
    }

    return true;
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  getUser() {
    if (this.getToken() === null) {
      return null;
    }

    return JSON.parse(localStorage.getItem('authUser'));
  }

  refreshToken(token) {
    return refresh(token).catch((error) => {
      if (error.response) {
        // toastr.error(error.response.data.message);
      } else {
        console.log(error);
      }
    });
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
