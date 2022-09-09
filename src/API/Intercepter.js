import axios from "axios";
import TokenService from "../Services/token.service";

const token = TokenService.getLocalAccessToken();

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    Authorization: "Bearer " + token,
  },
});

export { api };
