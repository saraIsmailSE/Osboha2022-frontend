import axios from "axios";
import UserInfo from "../Services/userInfoService";

const token = UserInfo.getLocalAccessToken();
 
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',headers: {'Authorization': 'Bearer '+token}
});

 

export { api };
