import axios from "axios";
import router from "@/router";

//read baseURL from .env file based on NODE_ENV
const baseURL = process.env.VUE_APP_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
});

function handelErrors(error) {
  if (error == 403) {
    router.push({
      name: "NotAuthorized",
    });
  }
}

export { api, baseURL, handelErrors };
