import {api} from "../api/Intercepter";
import UserInfo from "./userInfoService";

class AuthService {
  login({ username, password }) {
    return api
      .post("/auth/signin", {
        username,
        password
      })
      .then((response) => {
        if (response.data.accessToken) {
          UserInfo.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    UserInfo.removeUser();
  }

  register({ username, email, password }) {
    return api.post("/auth/signup", {
      username,
      email,
      password
    });
  }
}

export default new AuthService();