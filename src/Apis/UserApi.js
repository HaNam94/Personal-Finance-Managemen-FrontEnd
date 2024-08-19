import axiosInstance from "./axiosInstance";

class UserApi {
  static getCurrentUser() {
    return axiosInstance.get('/api/v1/user/me');
  }

  static updateCurrentUser(data) {
    return axiosInstance.put('/api/v1/user/me', data);
  }

  static uploadAvatarCurrentUser(data) {
    return axiosInstance.put('/api/v1/user/me/upload-avatar', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  static deleteUserAll(){
    return axiosInstance.delete('/api/v1/user/delete');
  }

  static async updateSettingUser(data) {
    return axiosInstance.put('/api/v1/user/me/setting', data);
  }
}

export default UserApi;