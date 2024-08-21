import axiosInstance from "./axiosInstance";

class AuthApi {
  static login(data) {
    return axiosInstance.post('/api/v1/public/login', data);
  }


  static register(data) {
    return axiosInstance.post('/api/v1/public/register', data);
  }

  static forgotPassword(data) {
    return axiosInstance.post('/api/v1/public/forgot-password', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }
  static resetPassword(data) {
    return axiosInstance.post('/api/v1/public/reset-password', data, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  static async verifyAccount(param) {
    return axiosInstance.post('/api/v1/public/verify', param);
  }

  static async google(credential) {
    return axiosInstance.post('/api/v1/public/google-login', credential);
  }
}

export default AuthApi;