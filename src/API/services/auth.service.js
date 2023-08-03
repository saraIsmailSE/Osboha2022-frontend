import { api } from "../Intercepter";
import UserInfo from "../../Services/userInfoService";
import { handleError } from "vue";

class AuthService {
  async login({ username, password }) {
    try {
      const response = api.post("/auth/signin", {
        username,
        password,
      });

      if (response.data.accessToken) {
        UserInfo.setUser(response.date);
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  logout() {
    UserInfo.removeUser();
  }

  async register(name, gender, email, phone, password, user_type) {
    return await api.post("/register", {
      name,
      gender,
      email,
      phone,
      password,
      user_type,
    });
  }

  async sendEmail() {
    let error = null;
    const res = await api
      .post("email/verification-notification")
      .catch((error) => {
        error = error.response.data.message;
        error;
      });
    return { data: res.data, error };
  }
  async resetEmail(email) {
    try {
      const response = await api.post("email/reset", {
        email: email,
      });
      return response.data.data;
    } catch (error) {
      return error.response;
    }
  }

  async resetPassword(password, email, token) {
    let resetData = new FormData();
    resetData.append("password", password);
    resetData.append("email", email);
    resetData.append("token", token);
    try {
      const response = await api.post("password/reset", resetData);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
  async forgetPassword(email) {
    try {
      const response = await api.post("password/forgot-password", {
        email: email,
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
  async sessionData() {
    try {
      const response = await api.get("session-data");
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  async refreshToken() {
    try {
      const response = await api.post("/refresh");
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }

  
  async returnToTeam() {
    try {
      const response = await api.get("/return-to-team");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  
}

export default new AuthService();
