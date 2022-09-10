import axios from "axios";
import UserInfo from "../Services/userInfoService";

const token = UserInfo.getLocalAccessToken();
 
const api = axios.create({
  baseURL: 'http://localhost:8000/api',headers: {'Authorization': 'Bearer '+token}
});

 

export { api };
