import { api } from "@/API/Intercepter";
import UserInfo from "./userInfoService";
import router from "@/router";
const setup = (store) => {
  api.interceptors.request.use(
    (config) => {
      const token = UserInfo.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
        // config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/auth/signin" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          store.dispatch("logout");
        } else if (err.response.status === 403) {
          router.push({ path: `/auth/confirm-mail` });
        } else if (
          err.response.status === 400 &&
          err.response.data.data == "ambassador without group"
        ) {
          router.push({ path: `/auth/not-ambassador-in-any-group` });
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;
