import axios from "axios";
import UserInfo from "../Services/userInfoService";

const token = UserInfo.getLocalAccessToken();
const baseURL= "http://127.0.0.1:8000/api/v1";
const api = axios.create({
  baseURL: baseURL,
  headers: { Authorization: "Bearer " + token },
});

export { api,baseURL };
