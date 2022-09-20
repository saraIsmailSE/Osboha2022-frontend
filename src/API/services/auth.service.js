import {api} from "../Intercepter";
import UserInfo from "../../Services/userInfoService";

class AuthService {
  async login({username, password}) {
    try {
      const response= api.post("/auth/signin", {
        username,
        password});

        if(response.data.accessToken){
          UserInfo.setUser(response.date)
        }
        return response.data;
    }catch(error){
      console.log(error)  
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
}

export default new AuthService();