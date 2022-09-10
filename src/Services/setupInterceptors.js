import {api} from '../api/Intercepter';
import UserInfo from "./userInfoService";
import router from '../router'
const setup = (store) => {
  api.interceptors.request.use(
    (config) => {
      const token = UserInfo.getLocalAccessToken();
      if (token) {
        // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        config.headers["x-access-token"] = token; // for Node.js Express back-end
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
        
          // store.dispatch('logout')
          // router.push({ path: '/auth/signin' })
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;